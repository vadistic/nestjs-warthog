import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import Post from './post.entity'

// test inheritance
@Entity()
class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string
}

@Entity()
export class Photo extends BaseEntity {
  @Column({ length: 500 })
  name!: string

  @Column('text')
  description!: string

  @Column()
  filename!: string

  @Column('int')
  views!: number

  @Column()
  isPublished!: boolean

  @ManyToOne(type => Post, post => post.photos, { nullable: true })
  post?: Post
}
