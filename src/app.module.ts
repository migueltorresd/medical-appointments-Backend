import { Module } from '@nestjs/common';
import { InfrastructureModule as InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { JWTconstans } from './domain/services/secret';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
      // envFilePath: '../environments/.env.dev',
    }),
    InfrastructureModule,
    JwtModule.register({
      global: true,
      secret: JWTconstans.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
