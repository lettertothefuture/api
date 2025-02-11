import 'reflect-metadata';

import sourceMapSupport from 'source-map-support';
import { start } from './server';
import { AppLogger } from '@/common/app-logger';
import { Registry } from './registry';

async function main() {
  sourceMapSupport.install({
    environment: 'node',
  });

  new Registry();

  try {
    const [address, environment] = await start();

    AppLogger.info('Initialization', `Started on ${environment} at ${address}`);
  } catch (e) {
    AppLogger.fatal(
      'Initialization',
      `An error ocurred at initialization, detail: ${e}`,
    );
    process.exit(1);
  }
}

main();
