import { OneByOneBuilder, TargetBuilder } from '../builder';

import Dotnet from './dotnet';
import { JavaBuilder } from './java';
import { KotlinBuilder } from './kotlin';
import JavaScript from './js';
import Python from './python';
import Ruby from './ruby';

export type TargetName = 'dotnet' | 'java' | 'js' | 'python' | 'ruby' | 'kotlin';

export const ALL_BUILDERS: {[key in TargetName]: TargetBuilder} = {
  dotnet: new OneByOneBuilder('dotnet', Dotnet),
  java: new JavaBuilder(),
  js: new OneByOneBuilder('js', JavaScript),
  python: new OneByOneBuilder('python', Python),
  ruby: new OneByOneBuilder('ruby', Ruby),
  kotlin: new KotlinBuilder(),
};


