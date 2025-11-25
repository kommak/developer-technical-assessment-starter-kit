import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PopularListing } from './popular-listing.interface';

@Injectable()
export class ListingsService {
  constructor(private dataSource: DataSource) {}

  async getPopularListings(): Promise<PopularListing[]> {
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

    const result: PopularListing[] = await this.dataSource.query(query);
    return result;
  }

  async getFeaturedListings(): Promise<PopularListing[]> {
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

    const result: PopularListing[] = await this.dataSource.query(query);
    return result;
  }
}
