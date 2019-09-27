import { Module, DynamicModule } from '@nestjs/common'

import { WarthogService } from './warthog.service'
import { WARTHOG_OPTIONS } from './wathog.constants'
import { WarthogModuleOptions, defaultOptions } from '../options'

@Module({
  providers: [
    {
      provide: WARTHOG_OPTIONS,
      useValue: defaultOptions,
    },
    WarthogService,
  ],
})
export class WarthogModule {
  static forRoot(options: WarthogModuleOptions): DynamicModule {
    return {
      module: WarthogModule,
      providers: [
        {
          provide: WARTHOG_OPTIONS,
          useValue: { ...defaultOptions, ...options },
        },
        WarthogService,
      ],
    }
  }
}
