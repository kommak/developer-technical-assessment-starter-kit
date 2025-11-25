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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lands_entity_1 = require("./lands.entity");
let LandsService = class LandsService {
    landRepo;
    constructor(landRepo) {
        this.landRepo = landRepo;
    }
    findAll() {
        return this.landRepo.find();
    }
    findTopViewed(limit = 6) {
        return this.landRepo.find({
            order: { view_count: 'DESC' },
            take: limit,
        });
    }
    findOne(id) {
        return this.landRepo.findOneBy({ id });
    }
    create(project) {
        const newLand = this.landRepo.create(project);
        return this.landRepo.save(newLand);
    }
};
exports.LandsService = LandsService;
exports.LandsService = LandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lands_entity_1.Land)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], LandsService);
//# sourceMappingURL=lands.service.js.map