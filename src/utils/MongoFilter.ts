import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {

    catch(exception: MongoError, host: ArgumentsHost) {
        switch (exception.code) {
            case 11000:
                const ctx = host.switchToHttp();
                const response = ctx.getResponse<Response>();
                response.statusCode = HttpStatus.CONFLICT;
                response
                    .json({
                        statusCode: HttpStatus.CONFLICT,
                        timestamp: new Date().toISOString(),
                        message: 'You are already registered'
                    });
        }
    }
}