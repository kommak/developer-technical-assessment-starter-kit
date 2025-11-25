"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentContactModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const agent_contact_service_1 = require("./agent-contact.service");
const agent_contact_controller_1 = require("./agent-contact.controller");
const agent_contacts_entity_1 = require("./agent-contacts.entity");
let AgentContactModule = class AgentContactModule {
};
exports.AgentContactModule = AgentContactModule;
exports.AgentContactModule = AgentContactModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([agent_contacts_entity_1.AgentContact])],
        providers: [agent_contact_service_1.AgentContactService],
        controllers: [agent_contact_controller_1.AgentContactController],
    })
], AgentContactModule);
//# sourceMappingURL=agent-contact.module.js.map