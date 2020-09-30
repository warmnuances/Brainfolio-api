import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../User/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt-strategy';

@Module({
  imports: [
  
    MongooseModule.forFeature([{
      name: User.name, 
      schema: UserSchema 
    }]),
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({
      secret : process.env.SECRET || "S3CR3T",
      signOptions: {
        expiresIn: 3600,
      }
    }),
    
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
