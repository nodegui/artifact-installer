import path from 'path';
import fs from 'fs';
import { setupArtifact } from '../index';
import { outputDir, TIMEOUT, metadata } from './utils';

describe('Setup QT for linux', () => {
  const osType = 'linux';
  const outDir = outputDir(osType);
  let outPath = '';

  beforeAll(async () => {
    outPath = await setupArtifact({ outDir, downloadLink: metadata.linux, id: 'nodeguiqt' });
  }, TIMEOUT);

  test('check if output path is same as specified: ', () => {
    expect(outPath).toBe(outDir);
  });

  test('check if qt exists', () => {
    const expectedPath = `5.13.0/gcc_64`;
    const doesQtExist = fs.existsSync(path.resolve(outDir, expectedPath));
    expect(doesQtExist).toBe(true);
  });
});
