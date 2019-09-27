import { Repository } from 'typeorm'
import { Injectable, Module } from '@nestjs/common'
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm'

import { WarthogModule } from '../../src/module/warthog.module'
import Post from './post.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
    // super(testRepository)
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Post]), WarthogModule],
  providers: [PostService],
})
export class PostModule {}
