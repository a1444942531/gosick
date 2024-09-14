import { Args, InputType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../service/auto.service';
import { TokenCreateDto } from '../dto/token.create.dto';
import * as bcrypt from 'bcryptjs'
import { UserService } from '../service/user.service';
import { User } from 'src/prisma-model-graphql/model/user.model';
import { WxService } from '../service/wx.service';
import { Logger } from '@nestjs/common';

@InputType()
class CreateUser extends TokenCreateDto { }

@Resolver()
export class TokenResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly miniprogram: WxService
    ) { }


    @Mutation(() => String)
    createToken(@Args("tokenCreateDto") tokenCreateDto: TokenCreateDto) {
        return this.authService.createToken(tokenCreateDto)
    }

    @Mutation(() => User, { description: "创建用户" })
    async createUser(@Args('createUser') createUser: CreateUser) {
        const { username, password } = createUser;

        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)

        return this.userService.create({
            username,
            encryptedPassword
        })
    }

    @Query(() => String)
    getMiniprogram(@Args('code', { description: "小程序code" }) code: String) {
        console.log(code)
        this.miniprogram.jscode2session(code)

        return "Hello WOrld"
    }
}
