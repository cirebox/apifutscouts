declare namespace Core {
  interface NestResponse {
    status: number | any;
    // eslint-disable-next-line @typescript-eslint/ban-types
    headers: Object;
    data: any;
  }

  interface NestResponseException {
    response: NestResponse;
  }
}
