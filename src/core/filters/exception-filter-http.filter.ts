import { NestResponseException } from '../http/nest-response-exception';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { ThrottlerException } from '@nestjs/throttler';

@Catch()
export class ExceptionFilterHttp implements ExceptionFilter {
  private readonly httpAdapter: AbstractHttpAdapter;
  protected readonly logger = new Logger();

  constructor(private readonly adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  public catch(exception: any, host: ArgumentsHost) {
    const contextHttp = host.switchToHttp();
    const request = contextHttp.getRequest();
    const response = contextHttp.getResponse();
    this.httpAdapter.setHeader(response, 'X-Powered-By', 'BoxSecurity');

    if (exception instanceof BadRequestException) {
      const resolver: any = exception;
      const status = 422;

      const body = {
        status: status,
        data: [],
        timestamp: new Date().getTime(),
        message: resolver.getResponse().message,
        return: resolver.getResponse().error,
      };

      return this.httpAdapter.reply(response, body, status);
    }

    if (exception instanceof ThrottlerException) {
      console.log(request.Ip);
      const status = exception.getStatus();
      const body = {
        status: status,
        data: [],
        timestamp: new Date().getTime(),
        message: 'Wait a moment to be able to make new requests.',
        return: 'Too Many Requests',
      };
      this.httpAdapter.setHeader(
        response,
        'Content-Type',
        'application/json; charset=utf-8',
      );
      return this.httpAdapter.reply(response, body, status);
    }

    if (exception instanceof NestResponseException) {
      const resolver: any = exception;
      const status =
        resolver.response?.status === undefined
          ? 500
          : resolver.response?.status;
      const body: any = resolver.response?.data;

      console.log({ ...body });

      this.logger.error(`STATUS ${status}`, body);
      return this.httpAdapter.reply(response, body, status);
    }

    const { status, body } =
      exception instanceof HttpException
        ? {
            status:
              exception.getStatus() === undefined ? 500 : exception.getStatus(),
            // body: exception.getResponse(),
            body: {
              status:
                exception.getStatus() === undefined
                  ? 500
                  : exception.getStatus(),
              data: [],
              timestamp: new Date().getTime(),
              message: exception.message,
              return: '',
            },
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              data: [],
              timestamp: new Date().getTime(),
              message: exception.message,
              return: 'Internal Server Error',
              path: request.path,
            },
          };
    return this.httpAdapter.reply(response, body, status);
  }
}
