import { GeneratorBase } from '../../generator';
import path = require('path');
import * as fs from 'fs-extra';
import { createDeclaration, KTypeDeclaration } from './kotlinmodel';
import { KotlinGeneratorConfiguration } from './kotlingeneratorconfiguration';
import { DeclarationNode } from './declarationnode';
import { Assembly } from 'jsii-reflect';
import { KotlinCodeMaker } from './kotlincodemaker';

export class KotlinGenerator extends GeneratorBase {
  private static getFileName(decl: KTypeDeclaration): string {
    return `${path.join('src', 'main', 'kotlin', ...decl.fqn.split('.'))}.kt`;
  }

  private static getAssemblyOutputDir(assembly: Assembly): string {
    const dir = assembly.name.replace(/\./g, '/');
    return path.join('src', 'main', 'resources', dir);
  }

  private readonly code = new KotlinCodeMaker();

  private packageDir: string | undefined = undefined;
  private _assembly: Assembly | undefined = undefined;

  public constructor() {
    super();
  }

  private get assembly(): Assembly {
    const assembly = this._assembly;

    if (!assembly) {
      throw new Error('Assembly is not set');
    }

    return assembly;
  }
  
  public async load(packageDir: string, assembly: Assembly): Promise<void> {
    this.packageDir = packageDir;
    this._assembly = assembly;
    return Promise.resolve();
  }

  public generate(fingerprint: boolean): void {
    const packageDir = this.packageDir;
    const assembly = this.assembly;
    const config = KotlinGeneratorConfiguration.of(assembly, fingerprint);

    if (!packageDir || !assembly) {
      throw new Error('KotlinGenerator is not initialized yet');
    }

    const node = DeclarationNode.of(assembly);
    
    for (const childNode of node.children) {
      const decl = createDeclaration(childNode, true);
      if (decl) {
        this.generateFile(decl, config);
      }
    }
  }

  private generateFile(decl: KTypeDeclaration, config: KotlinGeneratorConfiguration) {
    const fileName = KotlinGenerator.getFileName(decl);
    this.code.openFile(fileName);

    this.code.line(`package ${config.packageName}`)
    decl.render(this.code, config);
    
    this.code.closeFile(fileName);
  }

  public async save(outdir: string, tarball: string): Promise<any> {
    const assemblyDir = KotlinGenerator.getAssemblyOutputDir(this.assembly);
    if (assemblyDir) {
      const fullPath = path.resolve(path.join(outdir, assemblyDir, this.getAssemblyArchiveFileName(this.assembly)));
      await fs.mkdirp(path.dirname(fullPath));
      await fs.copy(tarball, fullPath, { overwrite: true });
    }

    return this.code.save(outdir);
  }

  public async upToDate(_outDir: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}