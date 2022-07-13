import fs from 'fs';
import YARM from 'yaml';
import { constantCase } from 'change-case';
import { FloyConfig } from './types';

export const loadFile = (fileName: string) => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
};

export const getConfiguration = async (configFilePath: string) => {
  const rawData = await loadFile(configFilePath);
  const config = YARM.parse(rawData) as FloyConfig;

  const mappedTask = Object.entries(config.workflows).map(([taskName, commands]) => {
    if (Array.isArray(commands)) {
      return { id: constantCase(taskName), commands };
    } else {
      throw new Error(`invalid task '${taskName}'`);
    }
  });

  return {
    title: config.title,
    version: config.version,
    tasks: mappedTask,
  };
};
