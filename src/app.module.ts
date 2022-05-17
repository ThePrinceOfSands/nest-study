import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { ReviewModule } from "./review/review.module";
import { TopPageModule } from "./top-page/top-page.module";

@Module({
  imports: [AuthModule, ProductModule, ReviewModule, TopPageModule, ConfigModule.forRoot()],
  controllers: [],
  providers: []
})
export class AppModule {}
