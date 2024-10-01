import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

@Injectable()
export class BearerMiddleware implements NestMiddleware {
  use(req: Request | any, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedException("No token provided");

    const parts = authHeader.split(" ");

    if (parts.length !== 2)
      throw new UnauthorizedException("Token badformated");

    const [scheme, token] = parts;

    if (!/Bearer$/i.test(scheme))
      throw new UnauthorizedException("Token badformated");

    verify(
      token,
      process.env.JWT_SECRET,
      (err: any, decoded: any): void | any => {
        if (err) throw new UnauthorizedException("Token invalid");

        if (!decoded.userId) throw new UnauthorizedException("Token invalid");

        req.userId = decoded.userId;

        return next();
      },
    );
  }
}
