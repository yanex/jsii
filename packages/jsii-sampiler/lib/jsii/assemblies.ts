import spec = require('jsii-spec');
import fs = require('fs-extra');
import path = require('path');

export interface LoadedAssembly {
  assembly: spec.Assembly;
  directory: string;
}

/**
 * Load assemblies by filename or directory
 */
export async function loadAssemblies(assemblyLocations: string[]) {
  const ret: LoadedAssembly[] = [];
  for (const loc of assemblyLocations) {
    const stat = await fs.stat(loc);
    if (stat.isDirectory()) {
      ret.push({
        assembly: await loadAssemblyFromFile(path.join(loc, '.jsii')),
        directory: loc
      });
    } else {
      ret.push({
        assembly: await loadAssemblyFromFile(loc),
        directory: path.dirname(loc),
      });
    }
  }
  return ret;
}

async function loadAssemblyFromFile(filename: string) {
  const contents = await fs.readJSON(filename, { encoding: 'utf-8' });
  return spec.validateAssembly(contents);
}

export type AssemblySnippetSource = { type: 'markdown'; markdown: string; where: string } | { type: 'literal'; source: string; where: string };

/**
 * Return all markdown and example snippets from the given assembly
 */
export function allSnippetSources(assembly: spec.Assembly): AssemblySnippetSource[] {
  const ret: AssemblySnippetSource[] = [];

  if (assembly.readme) {
    ret.push({ type: 'markdown', markdown: assembly.readme.markdown, where: `${assembly.name}-README` });
  }

  if (assembly.types) {
    Object.values(assembly.types).forEach(type => {
      emitDocs(type.docs, `${assembly.name}.${type.name}`);

      if (spec.isEnumType(type)) {
        type.members.forEach(m => emitDocs(m.docs, `${assembly.name}.${type.name}.${m.name}`));
      }
      if (spec.isClassOrInterfaceType(type)) {
        (type.methods || []).forEach(m => emitDocs(m.docs, `${assembly.name}.${type.name}#${m.name}`));
        (type.properties || []).forEach(m => emitDocs(m.docs, `${assembly.name}.${type.name}#${m.name}`));
      }
    });
  }

  return ret;

  function emitDocs(docs: spec.Docs | undefined, where: string) {
    if (!docs) { return; }

    if (docs.remarks) { ret.push({ 'type': 'markdown', markdown: docs.remarks, where }); }
    if (docs.example) { ret.push({ 'type': 'literal', source: docs.example, where: `${where}-example` }); }
  }
}