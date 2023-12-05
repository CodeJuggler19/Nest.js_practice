import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { off } from 'process';
import { SaveUserDTO } from './dto/save-user.dto';
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void> {
        const { name, email, password } = dto;
        console.log(dto);
        await this.userService.createUser(name, email, password);
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        const { signupVerifyToken } = dto;
        return await this.userService.verifyEmail(signupVerifyToken);
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<string> {
        const { email, password } = dto;

        return await this.userService.login(email, password);
    }

    @Get("/:id")
    async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
        return await this.userService.getUserInfo(userId);
    }

    @Get()
    findAll(
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        console.log(offset, limit);
        return;
    }
    @Post('/save')
    async saveUser(@Body() dto: SaveUserDTO): Promise<void> {
        this.userService.saveUser(dto.name, dto.email, dto.password, dto.signupVerifyToken);
    }
}