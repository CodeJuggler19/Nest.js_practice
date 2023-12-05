import { Inject } from "@nestjs/common";
import * as config from "@nestjs/config";

export default config.registerAs('email', () =>({
    service: process.env.EMAIL_SERVICE,
    auth:{
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EAMIL_AUTH_PASSWORD,
    },
    baseUrl: process.env.EMAIL_BASE_URL,
}));

export interface ConfigFactoryKeyHost<T = unknown> {
    KEY: string;
    asProvider():{
        imports: [ReturnType<typeof config.ConfigModule.forFeature>];
        useFactory: (config: T) => T;
        Inject: [string];
    }
}

export declare function registerAs<TConfig extends config.ConfigObject, TFactory extends
    config.ConfigFactory = config.ConfigFactory<TConfig>>(token: string, ConfigFactory: TFactory): TFactory &
ConfigFactoryKeyHost<ReturnType<TFactory>>; 