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
exports.LandsController = void 0;
const common_1 = require("@nestjs/common");
const lands_service_1 = require("./lands.service");
let LandsController = class LandsController {
    landsService;
    constructor(landsService) {
        this.landsService = landsService;
    }
    findAll() {
        return this.landsService.findAll();
    }
    getTopViewed() {
        return this.landsService.findTopViewed(6);
    }
    findOne(id) {
        return this.landsService.findOne(id);
    }
    create(land) {
        return this.landsService.create(land);
    }
};
exports.LandsController = LandsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LandsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('top-viewed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LandsController.prototype, "getTopViewed", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LandsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LandsController.prototype, "create", null);
exports.LandsController = LandsController = __decorate([
    (0, common_1.Controller)('land'),
    __metadata("design:paramtypes", [typeof (_a = typeof lands_service_1.LandsService !== "undefined" && lands_service_1.LandsService) === "function" ? _a : Object])
], LandsController);
//# sourceMappingURL=lands.controller.js.map