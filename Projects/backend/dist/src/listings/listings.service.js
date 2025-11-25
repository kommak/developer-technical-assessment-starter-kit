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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ListingsService = class ListingsService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getPopularListings() {
        const query = `
   (
  SELECT id, name, image_urls, price_range::text AS price, city, neighborhood, details, view_count, sq_ft_or_area, 'project' AS type
  FROM projects
  ORDER BY view_count DESC
  LIMIT 3
)
UNION ALL
(
  SELECT id, name, image_urls, price::text AS price, city, neighborhood, details, view_count, sq_ft_or_area, 'property' AS type
  FROM properties
  ORDER BY view_count DESC
  LIMIT 3
)
UNION ALL
(
  SELECT id, name, image_urls, price::text AS price, city, neighborhood, details, view_count, sq_ft_or_area, 'land' AS type
  FROM lands
  ORDER BY view_count DESC
  LIMIT 3
)
ORDER BY view_count DESC;
  `;
        const result = await this.dataSource.query(query);
        return result;
    }
    async getFeaturedListings() {
        const query = `
SELECT * FROM (
  SELECT * FROM (
    SELECT id, name, image_urls, price_range::text AS price, city, neighborhood, details, view_count, sq_ft_or_area, 'project' AS type
    FROM projects
    ORDER BY RANDOM()
    LIMIT 2
  ) AS p

  UNION ALL

  SELECT * FROM (
    SELECT id, name, image_urls, price::text AS price, city, neighborhood, details, view_count, sq_ft_or_area, 'property' AS type
    FROM properties
    ORDER BY RANDOM()
    LIMIT 2
  ) AS pr

  UNION ALL

  SELECT * FROM (
    SELECT id, name, image_urls, price::text AS price, city, neighborhood, details, view_count, sq_ft_or_area, 'land' AS type
    FROM lands
    ORDER BY RANDOM()
    LIMIT 2
  ) AS l
) AS combined
ORDER BY RANDOM();
`;
        const result = await this.dataSource.query(query);
        return result;
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], ListingsService);
//# sourceMappingURL=listings.service.js.map