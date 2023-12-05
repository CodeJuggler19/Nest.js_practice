import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';
// import { CoreModule } from './core/CoreModule';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';

@Module({
  imports: [UsersModule, EmailModule, ConfigModule.forRoot({
    envFilePath: (process.env.NODE_ENV === 'production') ? '.production.env'
    : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',//process.env.DATABASE_HOST,
    port: 3305,
    username: 'jin', //process.env.DATABASE_USERNAME,
    password: 'jin1234',//process.env.DATABASE_PASSWORD,
    database: 'test',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, //process.env.DATABASE_SYNCHRONIZE === 'true',
  }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

// npm run start:dev