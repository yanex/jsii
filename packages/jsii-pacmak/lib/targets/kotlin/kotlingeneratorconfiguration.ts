import { Assembly } from 'jsii-reflect';
import { KotlinTypeMapper } from './kotlintypemapper';
import { KotlinNamer } from './kotlinnamer';

export class KotlinGeneratorConfiguration {
  public static of(assembly: Assembly, fingerprint: boolean): KotlinGeneratorConfiguration {
    const platform = KotlinPlatform.Jvm
    const packageName = assembly.targets && assembly.targets.kotlin && assembly.targets.kotlin.package
    if (!packageName) {
      throw new Error('Kotlin package name not specified')
    }
    return new KotlinGeneratorConfiguration(platform, packageName, fingerprint)
  }

  public readonly typeMapper: KotlinTypeMapper
  public readonly namer: KotlinNamer

  public constructor(
    public readonly platform: KotlinPlatform,
    public readonly packageName: string,
    public readonly fingerprint: boolean
  ) {
    this.typeMapper = new KotlinTypeMapper(platform)
    this.namer = new KotlinNamer()
  }
}

export enum KotlinPlatform {
  Jvm
}