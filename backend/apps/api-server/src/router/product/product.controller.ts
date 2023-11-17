import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseEntity } from '@libs/common/helpers/responses';
import { AuthGuard } from '../../common/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('getProducts')
  async getProducts() {
    const result = await this.productService.getProducts();

    if (result === undefined) {
      return ResponseEntity.FAILED();
    }

    return ResponseEntity.OK_WITH_DATA(['success'], result);
  }
}
