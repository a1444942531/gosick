import { Inject, Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RolesGuard } from '../guard/roles.guard';
import { UserService } from '../service/user.service';
import { User } from 'src/prisma-model-graphql/model/user.model';
import { Redis } from 'ioredis';
import { Prisma } from '@prisma/client';

@Resolver()
@UseGuards(RolesGuard)
export class AppResolver {
    constructor(
        private userService: UserService,
        @Inject('REDIS_CLIENT')
        private readonly readisClient: Redis,
    ) { }

    private readonly logger = new Logger(AppResolver.name)

    @Query(() => String)
    async getRedis() {
        let alice = await this.readisClient.get("dasd")

        return alice
    }

    @Query(() => Number)
    async hello() {
        return 123
    }

    @Query(() => User)
    async getUser(@Args('id') id: number): Promise<User> {
        this.logger.log("upload -------------------")

        const findUser = await this.userService.user({
            id
        })

        if (!findUser) {
            throw new UnauthorizedException("用户不存在")
        }

        return findUser
    }
}
