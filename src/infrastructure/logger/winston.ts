import * as winston from 'winston'
import { ILogger, IloggerProps } from './interfaces/ILogger'
const LokiTransport = require('winston-loki')
const { combine, timestamp, simple, colorize, errors, json } = winston.format
export class Winston implements ILogger {
  private logger: winston.Logger
  constructor(loggerProps: IloggerProps) {
    this.logger = winston.createLogger({
      level: loggerProps.level || 'info',
      transports: [
        new LokiTransport({
          labels: {
            app: loggerProps.app,
            job: loggerProps.job || loggerProps.app
          },
          host: loggerProps.loggerUrl,
          level: loggerProps.level || 'info',
          format: combine(errors({ stack: true }), json()),
          replaceTimestamp: true,
          onConnectionError: (err) => console.error(err)
        }),
        new winston.transports.Console({
          format: combine(
            timestamp(),
            colorize({
              all: true
            }),
            simple(),
            errors({ stack: true })
          )
        })        
      ]
    })
  }
  log(message: any, ...optionalParams: any[]) {
    const [context, method, ...adctionalLabels] = optionalParams
    this.logger.log('info', message, {
      context,
      method,
      process: process.pid,
      ...adctionalLabels
    })
  }
  error(message: any, ...optionalParams: any[]) {
    const [context, method, ...adctionalLabels] = optionalParams
    this.logger.error(message, {
      context,
      method,
      process: process.pid,
      ...adctionalLabels
    })
  }
  warn(message: any, ...optionalParams: any[]) {
    const [context, method, ...adctionalLabels] = optionalParams
    this.logger.warn(message, {
      context,
      method,
      process: process.pid,
      ...adctionalLabels
    })
  }
  debug(message: any, ...optionalParams: any[]) {
    const [context, method, ...adctionalLabels] = optionalParams
    this.logger.debug(message, {
      context,
      method,
      process: process.pid,
      ...adctionalLabels
    })
  }
  info(message: any, ...optionalParams: any[]) {
    const [context, method, ...adctionalLabels] = optionalParams
    this.logger.info(message, {
      context,
      method,
      process: process.pid,
      ...adctionalLabels
    })
  }
  verbose(message: any, ...optionalParams: any[]) {
    const [context, method, ...adctionalLabels] = optionalParams
    this.logger.verbose(message, {
      context,
      method,
      process: process.pid,
      adctionalLabels
    })
  }
}
