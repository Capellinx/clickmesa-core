import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './modules/auth/auth.module';
import { ServicesModule } from './modules/services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      useFactory: async () => {
        const env = envSchema.parse(process.env);
        return {
          transport: {
            host: env.HOST_MAIL,
            port: env.PORT_MAIL,
            auth: {
              user: env.USER_MAIL,
              pass: env.PASSWORD_MAIL,
            },
          },
        };
      },
    }),
    EnvModule,
    RestaurantModule,
    AuthModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
