import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (this.isAxiosError(exception)) {
            const axiosError = exception.response.data;
            const status = axiosError.code || HttpStatus.INTERNAL_SERVER_ERROR;
            return response.status(status).json({
                status: 'error',
                code: status,
                message: axiosError.message || 'External service error',
                data: axiosError.data || null,
            });
        }

        const status =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
        exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error';

        response.status(status).json({
            status: 'error',
            code: status,
            message: message['message'] || message,
            data: null,
        });
    }

    private isAxiosError(exception: any): exception is { response: { data: any } } {
        return exception && exception.response && exception.response.data;
    }
}
  