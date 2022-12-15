import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { exceptionFactory } from './common/utils/exception-factory';
import { PrismaClientExceptionFilter } from './prisma/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: exceptionFactory,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Delilah Resto NestJS')
    .setDescription('API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
