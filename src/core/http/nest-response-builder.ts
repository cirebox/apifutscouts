import { NestResponse } from "./nest-response";

export class NestResponseBuilder {
  private response: NestResponse = {
    status: 200,
    headers: {} as any,
    body: {} as any,
  };

  public setStatus(status: number) {
    this.response.status = status;
    return this;
  }

  public setHeaders(headers: object) {
    this.response.headers = headers;
    return this;
  }

  public setBody(body: object) {
    this.response.body = body;
    return this;
  }

  public build() {
    return new NestResponse(this.response);
  }
}
