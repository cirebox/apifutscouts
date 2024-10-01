declare namespace Core {
  interface NestResponse {
    status: number | any;
    headers: object;
    data: any;
  }

  interface NestResponseException {
    response: NestResponse;
  }
}
