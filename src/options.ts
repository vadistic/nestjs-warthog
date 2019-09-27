import { Connection, ConnectionOptions } from 'typeorm'

export interface WarthogModuleOptions {
  /**
   * TODO:
   * Specify typeORM connection to use
   * (by default will use defualt TypeORM module connection).
   */
  connection?: Connection | ConnectionOptions | string
  /**
   * Entities glob. Needed to resolve entities import paths.
   */
  entities: string
  /**
   * Place for generated file. (Also needed to resolve paths for API use)
   */
  path: string
  /**
   * Generate base service classes
   */
  shouldGenerateServices?: boolean
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
  entities: '**/*.entity.ts',
  path: './generated/warthog.ts',
  shouldSkipPrettier: false,
  shouldGenerateServices: true,
  disabled: undefined,
}

export interface StringMap<T = any> {
  [key: string]: T
}
