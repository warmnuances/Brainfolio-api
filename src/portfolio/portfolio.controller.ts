import { Controller , Get, Post, Put, Delete, Body, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { PortfolioDto } from './dto/portfolio.dto';
import { PortfolioService } from './portfolio.service'
import { Portfolio } from './interfaces/portfolio.interface'
import { GetUser } from 'src/Auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { User } from 'src/User/user.schema';

@Controller('portfolio')
// @UseGuards(AuthGuard())
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService){}

    @Get()
    findAll(): Promise<Portfolio[]> {
        return this.portfolioService.findAll();
    } 

    @Get(':id')
    findOne(@Param() param): Promise<Portfolio> {
        return this.portfolioService.findOne(param.id);
    }

    @Post()
    //     create(@Body(ValidationPipe) createProjectDto: PortfolioDto, @GetUser() user: User): Promise<Portfolio> {

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

