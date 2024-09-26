import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();

      return next.handle().pipe(
        map((data) => {
          if (!response.statusCode || response.statusCode === 201) {
            response.statusCode = 200;
          }

          return {
            status: 'success',
            code: response.statusCode,
            message: data.message || 'Operación exitosa',
            data: data.data,
          };
        }),
      );
    }
  }
  