import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from 'class-transformer'
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value
        }
        
        const object = plainToInstance(metatype, value)
        const errors = await validate(object)
        if (errors.length > 0) {
            const constraints: any = errors[0].constraints
            let errorTxt = constraints[Object.keys(constraints)[0]]
            throw new BadRequestException(errorTxt)
        }

        return value
    }

    toValidate(metatype: Function) {
        const types: Function[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}
