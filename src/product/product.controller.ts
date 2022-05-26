import { Body, Controller, Get, Param, Post, Delete, Patch, HttpCode, NotFoundException, UsePipes, ValidationPipe } from "@nestjs/common";

import { ProductModel } from "./models/product.model";
import { FindProductDto } from "./dto/find-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";
import { ProductConstants } from "./constants/product.constants";
import { ValidationIdPipe } from "../common/pipes/validation-id.pipe";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("create")
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get(":id")
  async get(@Param("id", ValidationIdPipe) id: string) {
    const product = await this.productService.findById(id);

    if (!product) {
      throw new NotFoundException(ProductConstants.PRODUCT_NOT_FOUND_ERROR);
    }
  }

  @Delete(":id")
  async delete(@Param("id", ValidationIdPipe) id: string) {
    const deletedProduct = await this.productService.deleteById(id);

    if (!deletedProduct) {
      throw new NotFoundException(ProductConstants.PRODUCT_NOT_FOUND_ERROR);
    }
  }

  @Patch(":id")
  async patch(@Param("id", ValidationIdPipe) id: string, @Body() dto: ProductModel) {
    const updatedProduct = await this.productService.updateById(id, dto);

    if (!updatedProduct) {
      throw new NotFoundException(ProductConstants.PRODUCT_NOT_FOUND_ERROR);
    }

    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("find")
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto);
  }
}
