import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './core/service/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  // app.enableCors({
  //   origin: '*', // 允许所有来源
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 允许所有常见的 HTTP 方法
  //   allowedHeaders: 'Content-Type, Authorization', // 允许的请求头
  // });
  /** 日志 */
  app.useLogger(app.get(LoggerService))
  /** Redis */
  // app.connectMicroservice({})
  /** 微服务 */
  // @nestjs/microservices

  const config = new DocumentBuilder()
    .setTitle("清单")
    .setDescription("API文档")
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)

  await app.listen(8888);

  console.log(
    "http://localhost:8888"
  )
}
bootstrap();
