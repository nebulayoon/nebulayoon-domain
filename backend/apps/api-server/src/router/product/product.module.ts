import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ProductService],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
