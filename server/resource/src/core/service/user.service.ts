import { HttpException, Injectable } from "@nestjs/common";
import { Prisma } from '@prisma/client'
import { PrismaService } from "./prisma.service";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
        return await this.prisma.user.findUnique({
            where: userWhereUniqueInput
        })
    }

    // async selectUserName() {

    //     const task = await this.prisma.task.create({
    //         data: {
    //             name: "hello world",
    //             createById: 1,
    //             status: "DOING"
    //         }
    //     })

    //     let pageNum = 1
    //     let pageSize = 10

    //     this.prisma.user.findMany({
    //         // 分页功能
    //         skip: (pageNum - 1) * pageSize,
    //         take: pageSize,
    //         where: {
    //             username: {
    //                 // equals 相等
    //                 equals: "username",
    //                 // not 不等于
    //                 not: "username",
    //                 // in 包含于
    //                 in: ["username"],
    //                 // notIn 不包含与
    //                 notIn: ["username"],
    //                 // lt 小于
    //                 lt: "123",
    //                 // lte 小于等于
    //                 lte: "123",
    //                 // gt 大于
    //                 gt: "123",
    //                 // 大于等于
    //                 gte: "123",

    //             }
    //         },
    //         orderBy: {
    //             id: 'desc'
    //         }
    //     })
    // }

    async findByUsername(username: string) {
        return await this.prisma.user.findUnique({
            where: {
                username
            },
            /** 设置查询字段 */
            // select: {
            //     username: true
            // },
        })
    }

    // async create(userCreateRequest: UserCreateDto) {
    async create(userCreateRequest: Prisma.UserCreateInput) {
        const existedUser = await this.findByUsername(userCreateRequest.username)
        if (existedUser) {
            throw new HttpException("该用户名已被占用", 400)
        }

        return this.prisma.user.create({
            data: userCreateRequest
        })
    }
}