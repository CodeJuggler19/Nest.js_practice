import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class validationPipe implements PipeTransform<any>{
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        console.log("validationPipe pass");
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0){
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
    private toValidate(metatype: Function): boolean{
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}