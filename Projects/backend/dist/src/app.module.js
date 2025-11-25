"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const projects_module_1 = require("./projects/projects.module");
const properties_module_1 = require("./properties/properties.module");
const lands_module_1 = require("./lands/lands.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const listings_module_1 = require("./listings/listings.module");
const projects_entity_1 = require("./projects/projects.entity");
const properties_entity_1 = require("./properties/properties.entity");
const lands_entity_1 = require("./lands/lands.entity");
const users_entity_1 = require("./users/users.entity");
const agent_contacts_entity_1 = require("./agent-contacts/agent-contacts.entity");
const agent_contact_module_1 = require("./agent-contacts/agent-contact.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    username: config.get('DB_USER'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME'),
                    entities: [projects_entity_1.Project, properties_entity_1.Property, lands_entity_1.Land, users_entity_1.User, agent_contacts_entity_1.AgentContact],
                    synchronize: true,
                }),
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            projects_module_1.ProjectsModule,
            properties_module_1.PropertiesModule,
            lands_module_1.LandsModule,
            auth_module_1.AuthModule,
            listings_module_1.ListingsModule,
            agent_contact_module_1.AgentContactModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../../', '/sample data/images'),
                serveRoot: '/images',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map