import 'node-self';
import path from 'path';
import arg from 'arg';
import figlet from 'figlet';
// @ts-expect-error
import standard from 'figlet/importable-fonts/Standard.js';
import colors from 'colors';
import * as loader from './loader';
import * as executer from './executer';
import { prompt } from './utils';

const isCLI = require.main === module;

self.rootPath = path.resolve();
self.workDir = self.rootPath;

const args = arg({
  '--file': String,
  '-f': '--file',
});

const isEmpty = (data: unknown, message: string) => {
  if (!data) {
    throw new Error(message); 
  }
};

const showTitle = async (title: string, version?: string) => {
  await new Promise<void>((resolve) => {
    figlet.parseFont('Standard', standard);
    figlet(title, (_error, text) => {
      text && console.log(text);
      resolve();
    });
  });
  console.log(` ${version ?? ''}`);
};

const printTaskName = (id: string) => {
  process.stdout.write('\n');
  process.stdout.write(`${colors.green('•')} Running task: ${colors.bold.gray(id)}\n`);
};

const printTaskList = (taskIds: string[]) => {
  process.stdout.write('\n');
  process.stdout.write(colors.bgCyan.bold('┌ Workflow \n'));
  taskIds.forEach((id, index, array) => {
    let symbol = '├';
    if (array.length === index + 1) symbol = '└';
    process.stdout.write(`${symbol} ${colors.bold.gray(id)}\n`);
  });
  process.stdout.write(`Total count: ${colors.bold.cyan(taskIds.length + '')}\n`);
};

(async function main () {
  if (!isCLI) process.exit(0);

  const fileName = args['--file'] ?? '';
  isEmpty(fileName, 'file path is required');

  const config = await loader.getConfiguration(fileName);
  
  if (config.title) {
    await showTitle(config.title, config.version);
  }

  printTaskList(config.tasks.map(({ id }) => id));

  process.stdout.write('\nContinue? (Y/n): ');
  if (!await prompt()) {
    process.exit(1);
  }

  for await (const { id, commands } of config.tasks) {
    printTaskName(id);
    try {
      await executer.runs(commands);
    } catch (error) {
      const errorMessage = (error as Error)?.message ?? 'unknown error';
      process.stderr.write(`\n${colors.red('•')} Error occurrs in task ${colors.bold.gray(id)}\n\n`);
      process.stderr.write(colors.red(errorMessage) + '\n');
      throw null;
    }
  }

  process.stdout.write(`\n${colors.cyan('Floy')} workflow finished\n`);
  process.exit(0);
})().catch((error) => {
  error && process.stderr.write(`Error: ${error}\n`);
  process.exit(1);
});
