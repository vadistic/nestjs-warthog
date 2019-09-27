import { Entity, PrimaryColumn, Generated, Column, OneToMany } from 'typeorm'
import { Photo } from './photo.entity'

@Entity('sample_post')
class Post {
  @PrimaryColumn('uuid')
  @Generated()
  id!: number

  @Column()
  title!: string

  @Column()
  text!: string

  @Column()
  likesCount!: number

  @OneToMany(type => Photo, photo => photo.post)
  photos!: Photo[]
}

export default Post
