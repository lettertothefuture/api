import merge from 'lodash/merge';
import { CommonEnvironment } from './environment-common';
import { LocalEnvironment } from './environment-local';
import { ProductionEnvironment } from './environment-production';
import { CurrentEnvironment } from './environment';

const nodeEnv = process.env.NODE_ENV;

const env: 'production' | 'local' | undefined =
  nodeEnv === 'production' || nodeEnv === 'local' ? nodeEnv : undefined;

const CurrentEnvironment: CurrentEnvironment = merge(
  CommonEnvironment,
  env == 'production' ? ProductionEnvironment : LocalEnvironment,
);

export { CurrentEnvironment };
