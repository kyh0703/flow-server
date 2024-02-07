import { Module, type MiddlewareConsumer } from '@nestjs/common'
import { EventsModule } from './events/events.module'
import { ConfigModule, type ConfigService } from '@nestjs/config'
import appConfig from './config/app.config'
import { validate } from './config/env.validator'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session')

@Module({
  imports: [EventsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// @Module({
//   imports: [
//     // ConfigModule.forRoot({
//     //   isGlobal: true,
//     //   envFilePath: '.env',
//     //   load: [appConfig],
//     //   ignoreEnvFile: process.env.NODE_ENV === 'production',
//     //   validate,
//     // }),
//     // EventsModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {
//   static port: string

//   constructor(private configService: ConfigService) {
//     AppModule.port = this.configService.get('app.port')
//   }

//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(
//         cookieSession({
//           keys: [this.configService.get('app.cookieKey')],
//         }),
//       )
//       .forRoutes('*')
//   }
// }
