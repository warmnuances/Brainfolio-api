import { Controller , Get, Post, Put, Delete, Body, Param, ValidationPipe } from '@nestjs/common';
import { PortfolioDto } from './dto/portfolio.dto';
import { PortfolioService } from './portfolio.service'
import { Portfolio } from './interfaces/portfolio.interface'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../Auth/get-user.decorator';
import { User } from '../Auth/user.schema';

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService){}

    @Get()
    findAll(@GetUser() user: User): Promise<Portfolio[]> {
        return this.portfolioService.findAll(user.username);
    } 

    @Get(':id')
    findOne(@Param() param): Promise<Portfolio> {
        return this.portfolioService.findOne(param.id);
    }

    @Post()
    create(@Body(ValidationPipe) createProjectDto: PortfolioDto): Promise<Portfolio> {
        return this.portfolioService.create(createProjectDto);
    }

    @Delete(':id')
    delete(@Param() param): Promise<Portfolio> {
        return this.portfolioService.delete(param.id);
    }

    @Put(':id')
    update(@Body() updateItemDto: PortfolioDto, @Param() param): Promise<Portfolio> {
        return this.portfolioService.update(param.id,updateItemDto);
    }
}

