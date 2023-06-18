import { UserBridgeService } from "@microservices/common/dist/modules/user-bridge";
import { Post } from "@microservices/types/dist/post";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { CreatePostInput } from "./dto/create-post.input";
import { UpdatePostInput } from "./dto/update-post.input";

@Injectable()
export class PostsService {
  constructor(
    private readonly userBridgeService: UserBridgeService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>
  ) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    await this.userBridgeService.checkUser(createPostInput.author_id);

    const post = this.postsRepository.create(createPostInput);

    return await this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();

    return posts;
  }

  async findAllByIds(ids: string[]): Promise<Post[]> {
    const posts = await this.postsRepository.find({ where: { id: In(ids) } });

    return posts;
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    return post;
  }

  async update(updatePostInput: UpdatePostInput) {
    if (updatePostInput.author_id) {
      await this.userBridgeService.checkUser(updatePostInput.author_id);
    }

    const post = await this.postsRepository.preload(updatePostInput);

    if (!post) {
      throw new NotFoundException(`Post #${updatePostInput.id} not found`);
    }

    return this.postsRepository.save(post);
  }

  async remove(id: string) {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    await this.postsRepository.remove(post);

    return post;
  }
}
