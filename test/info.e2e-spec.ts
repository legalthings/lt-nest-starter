import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModuleConfig } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import util from 'util';
import fs from 'fs';

describe('Application e2e test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule(AppModuleConfig).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /info', () => {
    test('should return application info', async () => {
      const data = await util.promisify(fs.readFile)('package.json', { encoding: 'utf8' });
      const expected = JSON.parse(data);

      const res = await request(app.getHttpServer()).get('/info');
      expect(res.status).toBe(200);
      expect(res.header['content-type']).toMatch(/json/);
      expect(res.body).toMatchObject({
        description: expected.description,
        env: 'test',
        name: expected.name,
      });
    });
  });
});
