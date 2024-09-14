import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType({ description: "用户登录" })
export class TokenCreateDto {
    @IsNotEmpty({
        message: '用户名不能为空'
    })
    @Field({ description: "用户名" })
    username: string

    @IsNotEmpty({
        message: '用户名不能为空'
    })
    @Field({ description: "密码" })
    @MinLength(6, {
        message: "密码最少6个字符"
    })
    password: string
}
