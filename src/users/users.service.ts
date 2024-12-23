import { Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
    constructor(private emailService: EmailService,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private dataSource: DataSource) { }
    async createUser(name: string, email: string, password: string) {
        return;
        // await this.checkUserExists(email);

        // const signupVerifyToken = uuid.v1();

        // await this.saveUser(name, email, password, signupVerifyToken);
        // await this.sendMemberJoinEmail(email, signupVerifyToken);
    }

    private async checkUserExists(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({
            where: { email: email }
        })
        console.log(user);
        return user !== null;
    }

    async saveUser(name: string, email: string, password: string, signupVerifyToekn: string) {
        // const userExist = await this.checkUserExists(email);
        // if(userExist){
        //     throw new UnprocessableEntityException("해당 이메일로 가입할 수 없습니다.");
        // }
        // const user = new UserEntity();
        // user.id = ulid();
        // user.name = name;
        // user.email = email;
        // user.password = password;
        // user.signupVerifyToken = signupVerifyToekn;
        // await this.userRepository.save(user);

        // Transaction 1

        // const queryRunner = this.dataSource.createQueryRunner();

        // await queryRunner.connect();
        // await queryRunner.startTransaction();

        // try {
        //     const user = new UserEntity();
        //     user.id = ulid();
        //     user.name = name;
        //     user.email = email;
        //     user.password = password;
        //     user.signupVerifyToken = signupVerifyToekn;

        //     await queryRunner.manager.save(user);

        //     // throw new InternalServerErrorException();

        //     await queryRunner.commitTransaction();
        // }catch(e){

        //     await queryRunner.rollbackTransaction();
        // }finally{
        //     await queryRunner.release();
        // }

        // Transaction 2

        await this.dataSource.transaction(async manager => {
            const user = new UserEntity();
            user.id = ulid();
            user.name = name;
            user.email = email;
            user.password = password;
            user.signupVerifyToken = signupVerifyToekn;

            await manager.save(user);
            // throw new InternalServerErrorException();
            
        })
    }

    private async sendMemberJoinEmail(email: string, signupVerifyToekn: string) {
        console.log("통과");
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToekn);
    }
    async verifyEmail(signupVerifyToekn: string): Promise<string> {
        throw new Error('Method not implemented');
    }
    async login(email: string, password: string): Promise<string> {
        throw new Error('Method not implemented');
    }
    async getUserInfo(userId: string): Promise<UserInfo> {
        throw new Error('Method not implemented');
    }
}
