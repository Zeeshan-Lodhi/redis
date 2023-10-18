import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(post)
    private postRepository: Repository<post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<post> {
    return this.postRepository.save(createPostDto);
  }

  async findAll(): Promise<post[]> {
    return this.postRepository.find();
  }
}
