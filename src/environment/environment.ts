export interface Common {
  port: number;
  host: string;
}

export interface Environment {
  name: string;
  isDev: boolean;
}

export interface AllEnvironments {
  common: Common;
  local: Environment;
  production: Environment;
}

export type AllEnvironmentsKeys = keyof AllEnvironments;

export type CurrentEnvironment = Common & Environment;
