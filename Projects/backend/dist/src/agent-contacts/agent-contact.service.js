"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentContactService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agent_contacts_entity_1 = require("./agent-contacts.entity");
let AgentContactService = class AgentContactService {
    agentContactRepo;
    constructor(agentContactRepo) {
        this.agentContactRepo = agentContactRepo;
    }
    async createContact(dto, userId) {
        try {
            const contact = this.agentContactRepo.create({
                target_type: dto.target_type,
                target_id: dto.target_id,
                user: { id: userId },
            });
            return await this.agentContactRepo.save(contact);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new common_1.BadRequestException(err.message + userId);
            }
            throw new common_1.BadRequestException('Failed to create agent contact');
        }
    }
};
exports.AgentContactService = AgentContactService;
exports.AgentContactService = AgentContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agent_contacts_entity_1.AgentContact)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AgentContactService);
//# sourceMappingURL=agent-contact.service.js.map