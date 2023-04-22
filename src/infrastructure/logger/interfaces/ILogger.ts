export interface IloggerProps {
  app: string
  /**
   *
   */
  job?: string
  /**
   * ex: http://loggerurl.com:3100
   */
  loggerUrl: string
  level?: string
}
export interface ILogger {
  start?(options?: any): any
  stop?(options?: any): any
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]): any
  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]): any
  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]): any
  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]): any
  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]): any
  /**
   * Write a 'info' level log.
   */
  info?(message: any, ...optionalParams: any[]): any
}
