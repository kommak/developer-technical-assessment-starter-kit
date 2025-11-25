/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
import { bootstrap } from './main';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

describe('bootstrap', () => {
  let appMock: any;

  beforeEach(() => {
    appMock = {
      enableCors: jest.fn(),
      setGlobalPrefix: jest.fn(),
      listen: jest.fn().mockResolvedValue(undefined),
    };
    (NestFactory.create as jest.Mock).mockResolvedValue(appMock);
  });

  it('should create the app and configure it', async () => {
    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(appMock.enableCors).toHaveBeenCalledWith({
      origin: ['http://localhost:3001', 'http://localhost:3000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
    expect(appMock.setGlobalPrefix).toHaveBeenCalledWith('api');
    expect(appMock.listen).toHaveBeenCalledWith(3000);
  });
});
