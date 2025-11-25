import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { PropertiesModule } from './properties/properties.module';
import { LandsModule } from './lands/lands.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ListingsModule } from './listings/listings.module';
import { Project } from './projects/projects.entity';
import { Property } from './properties/properties.entity';
import { Land } from './lands/lands.entity';
import { User } from './users/users.entity';
import { AgentContact } from './agent-contacts/agent-contacts.entity';
import { AgentContactModule } from './agent-contacts/agent-contact.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [Project, Property, Land, User, AgentContact],
        synchronize: true, // only for dev
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ProjectsModule,
    PropertiesModule,
    LandsModule,
    AuthModule,
    ListingsModule,
    AgentContactModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', '/sample data/images'),
      serveRoot: '/images',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
