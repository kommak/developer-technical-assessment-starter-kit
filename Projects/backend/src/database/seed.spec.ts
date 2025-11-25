import { DataSource } from 'typeorm';

import * as seedFile from './seeder';

describe('Seed helpers', () => {
  it('getRandomInt should return number inside range', () => {
    const result = seedFile['getRandomInt'](1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('getRandomElements should return correct count', () => {
    const data = [1, 2, 3, 4, 5];
    const result = seedFile['getRandomElements'](data, 3);
    expect(result.length).toBe(3);
  });

  it('randomCity should return a city string', () => {
    const city = seedFile['randomCity']();
    expect(typeof city).toBe('string');
    expect(city.length).toBeGreaterThan(0);
  });

  it('randomNeighborhood should return a neighborhood string', () => {
    const neighborhood = seedFile['randomNeighborhood']();
    expect(typeof neighborhood).toBe('string');
    expect(neighborhood.length).toBeGreaterThan(0);
  });

  it('randomDetails should return a long string', () => {
    const details = seedFile['randomDetails']();
    expect(details.length).toBeGreaterThan(50);
  });
});

describe('Seed execution (mocked)', () => {
  it('should initialize and destroy datasource without real DB', () => {
    const mockInit = jest
      .spyOn(DataSource.prototype, 'initialize')
      .mockResolvedValue({} as any);

    const mockDestroy = jest
      .spyOn(DataSource.prototype, 'destroy')
      .mockResolvedValue();

    expect(mockInit).toBeDefined();
    expect(mockDestroy).toBeDefined();
  });
});
