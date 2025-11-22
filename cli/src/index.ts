#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('voidcast')
  .description('Voidcast CLI - Programmable blackhole proxy and honeypot toolkit')
  .version('0.1.0');

program
  .command('sink')
  .description('Start in sink mode (blackhole sink)')
  .option('-p, --port <port>', 'Port to listen on', '8080')
  .action((options) => {
    console.log(`Starting sink mode on port ${options.port}`);
    // TODO: Implement sink mode
  });

program
  .command('mirage')
  .description('Start in mirage mode (fake replay server)')
  .option('-p, --port <port>', 'Port to listen on', '8080')
  .action((options) => {
    console.log(`Starting mirage mode on port ${options.port}`);
    // TODO: Implement mirage mode
  });

program
  .command('drift')
  .description('Start in drift mode (dynamic proxy)')
  .option('-p, --port <port>', 'Port to listen on', '8080')
  .action((options) => {
    console.log(`Starting drift mode on port ${options.port}`);
    // TODO: Implement drift mode
  });

program
  .command('inspect')
  .description('Inspect traffic in real time')
  .option('-f, --filter <filter>', 'Filter expression')
  .action((options) => {
    console.log('Starting traffic inspection');
    // TODO: Implement traffic inspection
  });

program.parse();

