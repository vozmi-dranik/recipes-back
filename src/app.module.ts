import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './modules/recipe/recipe.module';
import { PrismaService } from './services/prisma/prisma.service';

@Module({
  imports: [RecipeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
