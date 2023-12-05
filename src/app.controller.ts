import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
// import { CommonService } from "./core/CommonService";

@Controller()
export class AppController {
    constructor(
        private readonly configService: ConfigService,
    ){}

    @Get()
    getHello(): string {
        return process.env.DATABASE_HOST;
    }

    @Get('/db-host-from-config')
    getDatabaseHostFromConfigService(): string{
        return this.configService.get('DATABASE_HOST');
    }

}