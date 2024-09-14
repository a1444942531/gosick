import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, MaxLength } from "class-validator"

export class UserCreateDto {
    @IsNotEmpty({
        message: '用户名不能为空'
    })
    @ApiProperty()
    username: string

    @IsNotEmpty({
        message: '密码不能为空'
    })
    @MaxLength(6, {
        message: '密码不能少于6位'
    })
    @ApiProperty()
    password: string
}