import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    credentials: true,
  })

  const options = new DocumentBuilder()
    .setTitle('Nest Project layout')
    .setDescription('The Nest Project layout API description')
    .setVersion('1.0')
    .addTag('project-layout')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.enableShutdownHooks()

  await app.listen(9091)
}
bootstrap()
