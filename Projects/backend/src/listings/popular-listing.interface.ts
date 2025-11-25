export interface PopularListing {
  id: number;
  name: string;
  image_urls: string[];
  price: string | number;
  city: string;
  neighborhood: string;
  details: string;
  view_count: number;
  sq_ft_or_area: number;
  type: 'project' | 'property' | 'land';
}
