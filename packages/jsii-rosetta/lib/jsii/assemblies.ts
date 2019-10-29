import spec = require('jsii-spec');
import fs = require('fs-extra');
import path = require('path');
import { TypeScriptSnippet, extractTypescriptSnippetsFromMarkdown } from '../tablets/snippets';

export interface LoadedAssembly {
  assembly: spec.Assembly;
  directory: string;
}

export interface ExtractedSnippet {
  originalSource: string;
  completeSource: string;
  where: string;
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
    if (docs.example && exampleLooksLikeSource(docs.example)) {
      ret.push({ 'type': 'literal', source: docs.example, where: `${where}-example` });
    }
  }
}

export function* allTypeScriptSnippets(assemblies: Array<{ assembly: spec.Assembly, directory: string }>): IterableIterator<ExtractedSnippet> {
  for (const assembly of assemblies) {
    for (const source of allSnippetSources(assembly.assembly)) {
      switch (source.type) {
        case 'literal':
          yield addFixture({ source: source.source, where: source.where }, assembly.directory);
          break;
        case 'markdown':
          for (const snippet of extractTypescriptSnippetsFromMarkdown(source.markdown, source.where)) {
            yield addFixture(snippet, assembly.directory);
          }
      }
    }
  }
}

/**
 * Wrap snippets with a fixture found in the same directory
 */
function addFixture(snippet: TypeScriptSnippet, directory: string): ExtractedSnippet {
  const paramClauses = snippet.parameters || [];
  let source = snippet.source;

  // Also extract parameters from an initial line starting with '/// ' (getting rid of that line).
  const m = /\/\/\/(.*)$/.exec(source);
  if (m) {
    paramClauses.push(...m[1].trim().split(' ').map(s => s.trim()).filter(s => s !== ''));
    source = source.split('\n').slice(1).join('\n');
  }

  const parameters = parseParameters(paramClauses);
  if (parameters.fixture) {
    // Explicitly request a fixture
    source = loadAndSubFixture(directory, parameters.fixture, source, true);
  } else if (parameters.nofixture === undefined) {
    source = loadAndSubFixture(directory, 'default', source, false);
  }

  return { originalSource: snippet.source, completeSource: source, where: snippet.where };
}

/**
 * Parse a set of 'param param=value' directives into an object
 */
function parseParameters(parameters: string[]): Record<string, string> {
  const ret: Record<string, string>  = {};
  for (const param of parameters) {
    const parts = param.split('=', 2);
    if (parts.length === 2) {
      ret[parts[0]] = parts[1];
    } else {
      ret[parts[0]] = '';
    }
  }

  return ret;
}

function loadAndSubFixture(directory: string, fixtureName: string, source: string, mustExist: boolean) {
  const fixtureFileName = path.join(directory, `rosetta/${fixtureName}.ts-fixture`);
  const exists = fs.existsSync(fixtureFileName);
  if (!exists && mustExist) {
    throw new Error(`Sample uses fixture ${fixtureName}, but not found: ${fixtureFileName}`);
  }
  if (!exists) { return source; }
  const fixtureContents = fs.readFileSync(fixtureFileName, { encoding: 'utf-8' });

  const subRegex = /\/\/\/ here/i;
  if (!subRegex.test(fixtureContents)) {
    throw new Error(`Fixture does not contain '/// here': ${fixtureFileName}`);
  }

  return fixtureContents.replace(subRegex, `/// !show\n${source}\n/// !hide`);
}

/**
 * See if the given source text looks like a code sample
 *
 * Many @examples for properties are examples of values (ARNs, formatted strings)
 * not code samples, which should not be translated
 *
 * If the value contains whitespace (newline, space) then we'll assume it's a code
 * sample.
 */
function exampleLooksLikeSource(text: string) {
  return !!text.trim().match(WHITESPACE);
}

const WHITESPACE = new RegExp('\\s');