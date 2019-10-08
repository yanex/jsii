import yargs = require('yargs');
import { FileSource, isErrorDiagnostic, LiteralSource, printDiagnostics,
  renderTree, translateMarkdown, TranslateResult, translateTypeScript, DEFAULT_TABLET_NAME } from '../lib';
import { PythonVisitor } from '../lib/languages/python';
import { VisualizeAstVisitor } from '../lib/languages/visualize';
import { extractSnippets } from '../lib/commands/extract';
import logging = require('../lib/logging');
import path = require('path');
import { readTablet as readTablet } from '../lib/commands/read';

async function main() {
  const argv = yargs
    .usage('$0 <cmd> [args]')
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      desc: 'Increase logging verbosity',
      count: true,
      default: 0
    })
    .command('snippet FILE', 'Translate a single snippet', command => command
        .positional('file', { type: 'string', describe: 'The file to translate (leave out for stdin)' })
        .option('python', { alias: 'p', boolean: true, description: 'Translate snippets to Python' })
    , wrapHandler(async args => {
      const result = translateTypeScript(
        await makeFileSource(args.file || '-', 'stdin.ts'),
        makeVisitor(args));
      renderResult(result);
    }))
    .command('markdown FILE', 'Translate a MarkDown file', command => command
        .positional('file', { type: 'string', describe: 'The file to translate (leave out for stdin)' })
        .option('python', { alias: 'p', boolean: true, description: 'Translate snippets to Python' })
    , wrapHandler(async args => {
      const result = translateMarkdown(
        await makeFileSource(args.file || '-', 'stdin.md'),
        makeVisitor(args));
      renderResult(result);
    }))
    .command('extract [ASSEMBLY..]', 'Extract code snippets from one or more assemblies into a language tablets', command => command
      .positional('ASSEMBLY', { type: 'string', string: true, default: new Array<string>(), describe: 'Assembly or directory to extract from' })
      .option('output', { alias: 'o', type: 'string', describe: 'Output file where to store the sample tablets', default: DEFAULT_TABLET_NAME })
      .option('must-compile', { alias: 'c', type: 'boolean', describe: 'Include compiler diagnostics', default: false })
      .option('directory', { alias: 'd', type: 'string', describe: 'Working directory (for require() etc)' })
      .option('fail', { alias: 'f', type: 'boolean', describe: 'Fail if there are compilation errors', default: true })
    , wrapHandler(async args => {

      // Easiest way to get a fixed working directory (for sources) in is to
      // chdir, since underneath the in-memory layer we're using a regular TS
      // compilerhost. Have to make all file references absolute before we chdir
      // though.
      const absAssemblies = (args.ASSEMBLY.length > 0 ? args.ASSEMBLY : ['.']).map(x => path.resolve(x));
      const absOutput = path.resolve(args.output);
      if (args.directory) {
        process.chdir(args.directory);
      }

      const result = await extractSnippets(absAssemblies, absOutput, args["must-compile"]);

      printDiagnostics(result.diagnostics, process.stderr);

      if (result.diagnostics.some(isErrorDiagnostic) && args.fail) {
        process.exit(1);
      }
    }))
    .command('read <TABLET> [KEY] [LANGUAGE]', 'Read snippets from a language tablet', command => command
      .positional('TABLET', { type: 'string', required: true, describe: 'Language tablet to read' })
      .positional('KEY', { type: 'string', describe: 'Snippet key to read' })
      .positional('LANGUAGE', { type: 'string', describe: 'Language ID to read' })
      .demandOption('TABLET')
    , wrapHandler(async args => {
      await readTablet(args.TABLET, args.KEY, args.LANGUAGE);
    }))
    .demandCommand()
    .help()
    .strict()  // Error on wrong command
    .version(require('../package.json').version)
    .showHelpOnFail(false)
    .argv;

  // Evaluating .argv triggers the parsing but the command gets implicitly executed,
  // so we don't need the output.
  Array.isArray(argv);
}

/**
 * Wrap a command's handler with standard pre- and post-work
 */
function wrapHandler<A extends { verbose?: number }>(handler: (x: A) => Promise<void>) {
  return (argv: A) => {
    logging.level = argv.verbose !== undefined ? argv.verbose : 0;
    return handler(argv);
  };
}

function makeVisitor(args: { python?: boolean }) {
  if (args.python) { return new PythonVisitor(); }
  // Default to visualizing AST, including nodes we don't recognize yet
  return new VisualizeAstVisitor();
}

async function makeFileSource(fileName: string, stdinName: string) {
  if (fileName === '-') {
    return new LiteralSource(await readStdin(), stdinName);
  }
  return new FileSource(fileName);
}

async function readStdin(): Promise<string> {
  process.stdin.setEncoding('utf8');

  const parts: string[] = [];

  return new Promise((resolve, reject) => {
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk !== null) { parts.push(`${chunk}`); }
    });

    process.stdin.on('error', reject);
    process.stdin.on('end', () => resolve(parts.join('')));
  });
}

function renderResult(result: TranslateResult) {
  process.stdout.write(renderTree(result.tree) + '\n');

  const diagnostics = [...result.compileDiagnostics, ...result.translateDiagnostics];

  if (diagnostics.length > 0) {
    printDiagnostics(diagnostics, process.stderr);

    if (diagnostics.some(isErrorDiagnostic)) {
      process.exit(1);
    }
  }
}

main().catch(e => {
  // tslint:disable-next-line:no-console
  console.error(e);
  process.exit(1);
});