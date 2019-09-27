import { Connection, ConnectionOptions } from 'typeorm'

export interface WarthogModuleOptions {
  /**
   * TODO:
   * Specify typeORM connection to use
   * (by default will use defualt TypeORM module connection).
   */
  connection?: Connection | ConnectionOptions | string
  /**
   * Place for generated file. (Also needed to resolve paths for API use)
   */
  path: string
  /**
   * Should prettier be used on generated files?
   */
  shouldSkipPrettier?: boolean
  /**
   * Custom disable logic (default is NODE_ENV !== 'development')
   */
  disabled?: boolean
}

export const defaultOptions: WarthogModuleOptions = {
  path: './generated/warthog.ts',
  shouldSkipPrettier: false,
  disabled: undefined,
}

export interface StringMap<T = any> {
  [key: string]: T
}
