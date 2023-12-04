import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IGetPostsParam } from './types/getPosts.type';
import { PostService } from './post.service';
import { AuthGuard } from '../../common/guard/auth.guard';
import CreatePostDto from './dto/createPost.dto';
import { User } from '../../common/decorator/user.decorator';
import { IAuthToken } from '../../auth/types/auth.type';
import UpdatePostDto from './dto/updatePost.dto';
import { ResponseEntity } from '@libs/common/helpers/responses';
import CreateCommentDto from './dto/createComment.dto';
import { CommentService } from './comment.service';

@UseGuards(AuthGuard)
@Controller()
export class PostController {
  constructor(
    @Inject(PostService) private readonly postService: PostService,
    @Inject(CommentService) private readonly commentService: CommentService,
  ) {}

  @Get()
  async getPosts(@Query() { offset, limit, startId }: IGetPostsParam) {
    const result = await this.postService.getPosts(offset, limit, startId);

    return ResponseEntity.OK_WITH_DATA(['success'], result);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    const result = await this.postService.getPostById(Number(id));

    return ResponseEntity.OK_WITH_DATA(['success'], result);
  }

  @Post()
  async createPost(@Body() post: CreatePostDto, @User() user: IAuthToken) {
    await this.postService.createPost(post, user);

    return ResponseEntity.CREATED();
  }

  @Patch(':id')
  async updatePost(@Param() id: string, @Body() post: UpdatePostDto) {
    await this.postService.updatePost(Number(id), post);

    return ResponseEntity.OK();
  }

  @Delete(':id')
  async deletePost(@Param() id: string) {
    await this.postService.deletePost(Number(id));

    return ResponseEntity.OK();
  }

  @Post('comment/:id')
  async createComment(
    @Param('id') postId: string,
    @User() user: IAuthToken,
    @Body() body: { comment: string },
  ) {
    const post = await this.postService.getPostById(Number(postId));
    const commentData: CreateCommentDto = {
      comment: body.comment,
      post: post,
    };

    await this.commentService.createComment(user, commentData);
    return ResponseEntity.CREATED();
  }
}
