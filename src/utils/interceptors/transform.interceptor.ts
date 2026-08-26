import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
    T,
    ApiResponse<T>
> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ApiResponse<T>> {
        const response = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            map((data: T) => ({
                success: true,
                statusCode: response.statusCode,
                message: 'Request successful',
                data,
            })),
        );
    }
}
