import { DataSource } from 'typeorm';
import { Project } from '../projects/projects.entity';
import { Property } from '../properties/properties.entity';
import { Land } from '../lands/lands.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Project, Property, Land],
  synchronize: false,
});

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function randomCity() {
  const cities = [
    'Muscat',
    'Salalah',
    'Sohar',
    'Nizwa',
    'Sur',
    'Bahla',
    'Rustaq',
    'Ibri',
    'Dhofar',
    'Seeb',
  ];
  return cities[getRandomInt(0, cities.length - 1)];
}

function randomNeighborhood() {
  const neighborhoods = [
    'Al Khuwair',
    'Al Ghubrah',
    'Ruwi',
    'Qurum',
    'Al Mouj',
    'Muttrah',
    'Seeb',
    'Al Hail',
    'Al Ansab',
    'Barka',
  ];
  return neighborhoods[getRandomInt(0, neighborhoods.length - 1)];
}

function randomDetails(): string {
  const details = [
    `This stunning property offers a perfect blend of modern design and functional living space. With spacious bedrooms, open-plan living areas, and large windows that allow natural light to flood in, it’s ideal for families looking for comfort and style. The kitchen is equipped with top-of-the-line appliances and sleek countertops, making it a dream for anyone who loves to cook. Located in a friendly neighborhood with easy access to schools, parks, and shopping centers, this home combines convenience with luxury.`,

    `A beautifully designed residence featuring high ceilings, elegant finishes, and a seamless indoor-outdoor flow. The living and dining areas are expansive and perfect for entertaining guests, while the bedrooms provide privacy and tranquility. The master suite includes a luxurious bathroom and walk-in closet. This property is situated close to major transport links, restaurants, and recreational facilities, offering the perfect balance between city life and peaceful living.`,

    `Experience sophisticated living in this exceptional home that boasts a contemporary design and ample space for the whole family. The property features a large, fully-fitted kitchen, multiple bathrooms with premium fittings, and outdoor areas perfect for relaxing or entertaining. With convenient access to local amenities, schools, and parks, it’s an ideal choice for families seeking comfort, style, and practicality.`,

    `A modern gem that combines elegance and functionality, this property offers expansive living spaces, stylish interiors, and state-of-the-art facilities. Each room is designed with attention to detail, ensuring comfort and luxury throughout. The property also includes a private garden and terrace, ideal for outdoor leisure. Its prime location provides easy access to transport, shopping, and recreational areas, making it a smart investment for long-term living.`,

    `This exquisite home features a harmonious mix of classic and modern design elements. The spacious living and dining areas are complemented by large windows and natural light, creating an inviting atmosphere. Bedrooms are generously sized, and bathrooms feature luxurious finishes. The property is situated in a vibrant community with easy access to schools, parks, restaurants, and shops, providing a convenient and enjoyable lifestyle.`,
  ];

  return details[Math.floor(Math.random() * details.length)];
}

async function seed() {
  await AppDataSource.initialize();

  const projectImages = [
    'http://localhost:3000/images/projects/project1.jpg',
    'http://localhost:3000/images/projects/project2.jpg',
    'http://localhost:3000/images/projects/project3.jpg',
    'http://localhost:3000/images/projects/project4.jpg',
    'http://localhost:3000/images/projects/project5.jpg',
    'http://localhost:3000/images/projects/project6.jpg',
    'http://localhost:3000/images/projects/project7.jpg',
    'http://localhost:3000/images/projects/project8.jpg',
    'http://localhost:3000/images/projects/project9.jpg',
    'http://localhost:3000/images/projects/project10.jpg',
  ];

  const propertyImages = [
    'http://localhost:3000/images/properties/property1.jpg',
    'http://localhost:3000/images/properties/property2.jpg',
    'http://localhost:3000/images/properties/property3.jpg',
    'http://localhost:3000/images/properties/property4.jpg',
    'http://localhost:3000/images/properties/property5.jpg',
    'http://localhost:3000/images/properties/property6.jpg',
    'http://localhost:3000/images/properties/property7.jpg',
    'http://localhost:3000/images/properties/property8.jpg',
    'http://localhost:3000/images/properties/property9.jpg',
    'http://localhost:3000/images/properties/property10.jpg',
  ];

  const landImages = [
    'http://localhost:3000/images/lands/land1.jpg',
    'http://localhost:3000/images/lands/land2.jpg',
    'http://localhost:3000/images/lands/land3.jpg',
    'http://localhost:3000/images/lands/land4.jpg',
    'http://localhost:3000/images/lands/land5.jpg',
    'http://localhost:3000/images/lands/land6.jpg',
    'http://localhost:3000/images/lands/land7.jpg',
    'http://localhost:3000/images/lands/land8.jpg',
    'http://localhost:3000/images/lands/land9.jpg',
    'http://localhost:3000/images/lands/land10.jpg',
  ];

  const amenities = [
    'Swimming Pool',
    'Gym',
    'Parking',
    '24/7 Security',
    'Garden',
    'Terrace',
    'Balcony',
    'Elevator',
    'Air Conditioning',
    'Central Heating',
    'Sauna',
    'Playground',
    'Community Hall',
    'Pet Friendly',
    'BBQ Area',
    'Storage Room',
    'Smart Home Features',
    'Jacuzzi',
    'Library',
    'Cinema Room',
  ];

  const projectRepo = AppDataSource.getRepository(Project);
  const propertyRepo = AppDataSource.getRepository(Property);
  const landRepo = AppDataSource.getRepository(Land);

  // ---- SEED PROJECTS ----
  const projects: Project[] = [];
  for (let i = 0; i < 400; i++) {
    projects.push(
      projectRepo.create({
        name: `Project ${i + 1}`,
        image_urls: getRandomElements(projectImages, getRandomInt(1, 5)),
        price_range: `${getRandomInt(100000, 1000000)} - ${getRandomInt(100000, 1000000)}`,
        city: randomCity(),
        neighborhood: randomNeighborhood(),
        details: randomDetails(),
        amenities: getRandomElements(amenities, getRandomInt(1, 5)),
        view_count: getRandomInt(0, 5000),
        sq_ft_or_area: getRandomInt(500, 5000),
      }),
    );
  }
  await projectRepo.save(projects);

  // ---- SEED PROPERTIES ----
  const properties: Property[] = [];
  for (let i = 0; i < 400; i++) {
    properties.push(
      propertyRepo.create({
        name: `Property ${i + 1}`,
        image_urls: getRandomElements(propertyImages, getRandomInt(1, 5)),
        price: getRandomInt(50000, 500000),
        city: randomCity(),
        neighborhood: randomNeighborhood(),
        details: randomDetails(),
        view_count: getRandomInt(0, 5000),
        bedrooms: getRandomInt(1, 6),
        bathrooms: getRandomInt(1, 6),
        amenities: getRandomElements(amenities, getRandomInt(1, 5)),
        sq_ft_or_area: getRandomInt(300, 3000),
      }),
    );
  }
  await propertyRepo.save(properties);

  // ---- SEED LANDS ----
  const lands: Land[] = [];
  for (let i = 0; i < 400; i++) {
    lands.push(
      landRepo.create({
        name: `Land ${i + 1}`,
        image_urls: getRandomElements(landImages, getRandomInt(1, 5)),
        price: getRandomInt(20000, 300000),
        city: randomCity(),
        neighborhood: randomNeighborhood(),
        details: randomDetails(),
        amenities: getRandomElements(amenities, getRandomInt(1, 5)),
        view_count: getRandomInt(0, 3000),
        sq_ft_or_area: getRandomInt(1000, 10000),
      }),
    );
  }
  await landRepo.save(lands);
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  AppDataSource.destroy();
});

export {
  getRandomInt,
  getRandomElements,
  randomCity,
  randomNeighborhood,
  randomDetails,
};
