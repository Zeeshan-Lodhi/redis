import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { post } from './entities/post.entity';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<post> {
    return this.postService.create(createPostDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all-post')
  @CacheTTL(60000)
  async findAll() {
    const cachedData = await this.cacheManager.get('all-post');
    if (cachedData) {
      console.log('Getting data from cache');
      return cachedData;
    }
    console.log('hello');

    const post = await this.postService.findAll();

    if (!post) throw new NotFoundException();

    await this.cacheManager.set('all-post', post, 0);
    const newCachedData = await this.cacheManager.get('all-post');
    console.log('data set to cache', newCachedData);

    return post;
  }
}
