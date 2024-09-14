import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../service/logger.service';

export const CORRELATION_ID_HEADER = 'X-Carrelation-Id'

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  private readonly logger = new LoggerService("全局拦截器");

  use(req: Request, res: Response, next: NextFunction) {
    // 如果请求是预检请求（OPTIONS），则不继续执行其他中间件或路由处理器  
    console.log(
      req.method,
      "----------------------"
    )
    
    if (req.method === 'OPTIONS') {
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,include');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }


    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    }

    const { method, originalUrl, body, query, headers } = req;
    const { authorization } = headers

    let logExtens = ""
    if (authorization) {
      const userinfo = decodeURI(atob(authorization.split(" ")[1].split(".")[1]))

      logExtens += `authorization: ${authorization}, UserInfo: ${userinfo},`
    }

    const id = randomUUID()

    req[CORRELATION_ID_HEADER] = id
    res.set(CORRELATION_ID_HEADER, id)

    // res.set("Access-Control-Allow-Origin", "*")
    // req["Access-Control-Allow-Origin"] = "*"

    var oldSend = res.send;

    let _this = this
    res.send = function (data) {
      _this.logger.log(`Request... IP: ${req.ip}, ${logExtens} Method: ${method}, URL: ${originalUrl}, Body: ${JSON.stringify(body)}, Query: ${JSON.stringify(query)}`);
      _this.logger.log(`Response... ${JSON.stringify(data)}`);

      return oldSend.apply(res, arguments);
    }

    next()
  }
}
