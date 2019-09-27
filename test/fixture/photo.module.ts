import { Repository } from 'typeorm'
import { Injectable, Module } from '@nestjs/common'
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm'

import { WarthogModule } from '../../src/module/warthog.module'
import { Photo } from './photo.entity'

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {
    // super(testRepository)
  }

  async create() {
    const photo = this.photoRepository.create({ name: 'My New Photo' })

    const postRepository = this.photoRepository.manager.getRepository('Post')
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), WarthogModule],
  providers: [PhotoService],
})
export class PhotoModule {}
