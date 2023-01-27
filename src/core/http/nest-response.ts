export class NestResponse {
  status: any;
  headers: any;
  body: any;

  constructor(resposta: NestResponse) {
    Object.assign(this, resposta);
  }
}
