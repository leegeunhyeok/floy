import path from 'path';

export const prompt = () => {
  return new Promise((resolve) => {
    process.stdin.on('data', (data) => {
      const input = data.toString().trim().toLowerCase();
      if (input === '' || input === 'y') {
        resolve(true);
      } else {
        resolve(false);
      }
      process.stdin.end();
    });
  });
};

export const parseCommand = (command: string) => {
  const [cmd, ...args] = command.split(' ').filter(Boolean);
  return { command: cmd, args };
};

export const parsePath = (targetPath: string, basePath: string) => {
  targetPath = targetPath.charAt(0) === '~'
    ? path.join(process.env.HOME ?? '', targetPath.slice(1))
    : targetPath;

  return path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(basePath, targetPath);
};
