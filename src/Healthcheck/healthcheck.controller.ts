import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Connection } from 'mongoose';
import { GetUser } from '../Auth/get-user.decorator';
import { User } from '../Auth/user.schema';


@Controller("/test")

export class HealthCheckController {
  private start: number;

	constructor(@InjectConnection() private readonly connection: Connection) {
		this.start = Date.now();
  }
  
  @UseGuards(AuthGuard())
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @Get("authenticated")
  async isAuthenticated(@GetUser() user: User){
  
    return user;
  }


  @ApiOkResponse({
    description: JSON.stringify({ 
      backend: true,
      database: true,
      uptime: 43})
  })
  @Get("healthcheck")
  async check(){
    const now = Date.now();
    
    return {
      backend: true,
      database: `${this.connection.readyState === 1}`,
      uptime: Number((now - this.start) / 1000).toFixed(0)
    }
  }
}
