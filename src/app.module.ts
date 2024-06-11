import { Module } from '@nestjs/common';
import { AppController } from './infra/app.controller';
import { PrismaService } from './infra/prisma.service';
import { HttpModule } from './infra/http.module';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
