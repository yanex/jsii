import spec = require('jsii-spec');
import { PackageInfo, Target } from '../target';
import { shell } from '../util';
import { JsiiModule } from '../packaging';
import { BuildOptions } from '../builder';
import { AbstractPomBasedTargetBuilder } from './jvm/abstractpombasedtargetbuilder';
import { JvmMavenUtils } from './jvm/mavenutils';
import { KotlinGenerator } from './kotlin/kotlingenerator';

export class KotlinBuilder extends AbstractPomBasedTargetBuilder {
  public readonly targetName = 'kotlin';
  public readonly targetConstructor = Kotlin;

  public makeTarget(module: JsiiModule, options: BuildOptions): Target {
    return new Kotlin({
      targetName: this.targetName,
      packageDir: module.moduleDirectory,
      assembly: module.assembly,
      fingerprint: options.fingerprint,
      force: options.force,
      arguments: options.arguments
    });
  }
}

class Kotlin extends Target {
  public static toPackageInfos(assm: spec.Assembly): { [language: string]: PackageInfo } {
    return JvmMavenUtils.toPackageInfos(assm);
  }

  public static toNativeReference(type: spec.Type, options: any) {
    const [, ...name] = type.fqn.split('.');
    return { java: `import ${[options.package, ...name].join('.')}` };
  }

  protected readonly generator = new KotlinGenerator();

  public async build(sourceDir: string, outDir: string): Promise<void> {
    const url = `file://${outDir}`;
    const mvnArguments = new Array<string>();
    for (const arg of Object.keys(this.arguments)) {
      if (!arg.startsWith('mvn-')) { continue; }
      mvnArguments.push(`--${arg.slice(4)}`);
      mvnArguments.push(this.arguments[arg].toString());
    }

    // traverse the dep graph of this module and find all modules that have
    // an <outdir>/java directory. we will add those as local maven
    // repositories which will resolve instead of Maven Central for those
    // module. this enables building against local modules (i.e. in lerna
    // repositories or linked modules).
    const localRepos = await this.findLocalDepsOutput(this.packageDir);

    const userXml = await JvmMavenUtils.generateMavenSettingsForLocalDeps(sourceDir, outDir, localRepos);
    await shell(
      'mvn',
      [...mvnArguments, 'deploy', `-D=altDeploymentRepository=local::default::${url}`, `--settings=${userXml}`],
      {
        cwd: sourceDir,
        env: {
          // Twiddle the JVM settings a little for Maven. Delaying JIT compilation
          // brings down Maven execution time by about 1/3rd (15->10s, 30->20s)
          MAVEN_OPTS: `${process.env.MAVEN_OPTS || ''} -XX:+TieredCompilation -XX:TieredStopAtLevel=1`
        }
      }
    );
  }
}