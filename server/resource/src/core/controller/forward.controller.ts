import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { aliceReq } from '../utils/get.http';

@Controller('forwards')
export class ForwardController {
  constructor(
    private readonly configService: ConfigService
  ) { }

  @Post("*")
  async to(@Req() req: Request, method: "GET" | "POST" = "POST", @Body() body?) {
    const authorization = req.headers.authorization
    // if (!authorization) {
    //   throw new UnauthorizedException("未登录")
    // }

    const orgUrl = req.originalUrl.split("/")
    orgUrl.shift()
    orgUrl.shift()

    if (!this.configService.get("FORWARDS_URL")) {
      throw new UnauthorizedException("未配置 FORWARDS_URL")
    }

    let url = this.configService.get("FORWARDS_URL") + "/" + orgUrl.join("/")
    const ret = await aliceReq(url, authorization, method, body)

    return ret;
  }

  @Get("*")
  al(@Req() req: Request) {
    return this.to(req, "GET")
  }

}
