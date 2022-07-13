import { spawn } from 'child_process';
import { parseCommand, parsePath } from './utils';

const spawnOptions = {
  env: {
    ...process.env,
    FLOY_ROOT: self.rootPath,
  },
};

export const run = (command: string, args?: Parameters<typeof spawn>[1]) => {
  return new Promise<void>((resolve, reject) => {
    if (command === 'cd' && Array.isArray(args) && args[0]) {
      self.workDir = parsePath(args[0], self.workDir);
      resolve();
      return;
    }

    const spawnedProcess = spawn(command, args, {
      ...spawnOptions,
      cwd: self.workDir
    });

    spawnedProcess.stdout.setEncoding('utf8');
    spawnedProcess.stderr.setEncoding('utf8');

    spawnedProcess.stdout.pipe(process.stdout);
    spawnedProcess.stderr.pipe(process.stderr);
  
    spawnedProcess.on('error', (error) => reject(error));
    spawnedProcess.on('exit', (code) => {
      (code === 0 ? resolve : reject)();
    });
  });
};

export const runs = async (commands: string[]) => {
  for await (const command of commands) {
    const { command: cmd, args } = parseCommand(command);
    await run(cmd, args);
  }
};
