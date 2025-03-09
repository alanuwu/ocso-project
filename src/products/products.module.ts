import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JWT_KEY, EXPIRES_IN } from '../auth/constants/jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    // Importas JwtModule para que JwtService esté disponible
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: EXPIRES_IN },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
