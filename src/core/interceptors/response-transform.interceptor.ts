import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from '../http/nest-response';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(private readonly adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((responseController: NestResponse) => {
        if (responseController instanceof NestResponse) {
          const contextHttp = context.switchToHttp();
          const response = contextHttp.getResponse();
          const { headers, status, body }: any = responseController;

          const nameHeaders = Object.getOwnPropertyNames(headers);

          nameHeaders.forEach((name: string) => {
            const valueHeaders = headers[name];
            this.httpAdapter.setHeader(response, name, valueHeaders);
          });

          this.httpAdapter.status(response, status);

          return body;
        }
        return responseController;
      }),
    );
  }
}
