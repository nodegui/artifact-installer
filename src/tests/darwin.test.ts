import path from 'path';
import fs from 'fs';
import { setupQt } from '../index';
import { outputDir, TIMEOUT } from './utils';

describe('Setup QT for darwin', () => {
  const osType = 'darwin';
  const qtDir = outputDir(osType);
  let outPath = '';

  beforeAll(async () => {
    outPath = await setupQt({ qtDir, osType });
  }, TIMEOUT);

  test('check if output path is same as specified: ', () => {
    expect(outPath).toBe(qtDir);
  });

  test('check if qt exists', () => {
    const expectedPath = `5.13.0/clang_64`;
    const doesQtExist = fs.existsSync(path.resolve(qtDir, expectedPath));
    expect(doesQtExist).toBe(true);
  });
});
