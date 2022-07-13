export type Command = string;

export type FloyConfig = {
  title?: string;
  version?: string;
  workflows: Record<string, Command[]>;
};
