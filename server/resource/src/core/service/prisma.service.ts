import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'] // 日志级别
    })
  }
  
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    console.log("断开数据库")
    await this.$disconnect();
  }
}
