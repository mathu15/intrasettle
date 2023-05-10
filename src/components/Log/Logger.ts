//  https://www.meticulous.ai/blog/getting-started-with-react-logging

/** Signature of a logging function */
export interface LogFn {
  (message?: any, ...optionalParams: any[]): void;
}

/** Basic logger interface */
export interface Logger {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
}

//
/** Logger which outputs to the browser console */
// export class ConsoleLogger implements Logger {
//   const log: LogFn;
//   //readonly log: LogFn;
//   readonly warn: LogFn;
//   readonly error: LogFn;

//   constructor() {
//     this.log = console.log.bind(console);
//     this.warn = console.warn.bind(console);
//     this.error = console.error.bind(console);
//   }
// }/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  constructor() {
    this.log = console.log.bind(console);
    this.warn = console.warn.bind(console);
    this.error = console.error.bind(console);
  }
}
