import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSchema } from './schemas/portfolio.schema';
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Portfolio', schema: PortfolioSchema }]), AuthModule],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
