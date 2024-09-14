import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserService } from './service/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './pipe/validation.pipe';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auto.service';
import { SECRET_KEY } from './constant/user.constant';
import { PrismaService } from './service/prisma.service';
import { AppResolver } from './resolver/app.resolver';
import { RolesGuard } from './guard/roles.guard';
import { TokenResolver } from './resolver/token.resolver';
import { WxService } from './service/wx.service';
import { ForwardController } from './controller/forward.controller';
import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware';
import { LoggerService } from './service/logger.service';
import Redis from 'ioredis'

@Global()
@Module({
    imports: [
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            // installSubscriptionHandlers: true,
            autoSchemaFile: true,
        }),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.register({
            global: true,
            secret: SECRET_KEY,
            signOptions: {
                expiresIn: '30000s'
            }
        }),
    ],
    controllers: [
        ForwardController
    ],
    providers: [
        UserService, {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
        RolesGuard,
        AuthService,
        PrismaService,
        WxService,
        /** graphql */
        AppResolver,
        TokenResolver,
        LoggerService,
        {
            provide: "REDIS_CLIENT",
            useFactory: (configService: ConfigService) => {
                const redisURL = configService.get<string>("REDIS_URL")!
                return new Redis(redisURL)
            },
            inject: [ConfigService],
        }
    ],
    exports: [
        "REDIS_CLIENT"
    ]
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CorrelationIdMiddleware).forRoutes("*")
    }
};