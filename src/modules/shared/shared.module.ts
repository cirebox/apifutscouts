import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { BearerMiddleware } from "./middlewares/bearer.middleware";
import { NestResponseBuilder } from "./../../core/http/nest-response-builder";
import { APIFutebolProvider } from "./providers/http/http-apifutebol.provider";
import { GlobalService } from "./services/global.services";

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    BearerMiddleware,
    NestResponseBuilder,
    GlobalService,
    {
      provide: "IAPIFutebolProvider",
      useClass: APIFutebolProvider,
    },
  ],
  exports: [
    BearerMiddleware,
    NestResponseBuilder,
    GlobalService,
    {
      provide: "IAPIFutebolProvider",
      useClass: APIFutebolProvider,
    },
  ],
})
export class SharedModule {}
