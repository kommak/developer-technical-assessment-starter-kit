import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('projects')
@Index(['city', 'neighborhood'])
@Index(['price_range'])
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true })
  image_urls: string[];

  @Column({ type: 'varchar', nullable: true })
  price_range: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'numeric', nullable: true })
  view_count: number;

  @Column({ type: 'text', array: true, nullable: true })
  amenities: string[];

  @Column({ type: 'numeric', nullable: true })
  sq_ft_or_area: number;

  @Column({ type: 'tsvector', nullable: true })
  search_vector: string;
}
