import { NotFoundException } from '@nestjs/common';

class PostNotFoundException extends NotFoundException {
  constructor(postId: number) {
    super(`${postId}번 포스트를 찾을 수 없습니다`);
  }
}

export default PostNotFoundException;
