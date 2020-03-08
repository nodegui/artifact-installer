import path from 'path';
import fs from 'fs';
import { setupArtifact } from '../index';
import { outputDir, TIMEOUT, metadata } from './utils';

describe('Setup QT for win32', () => {
  const osType = 'win32';
  const outDir = outputDir(osType);
  let outPath = '';
  const skipSetup = async (): Promise<boolean> => {
    return fs.existsSync(path.resolve(outDir, '5.13.0', 'msvc2017_64', 'lib'));
  };
  beforeAll(async () => {
    outPath = await setupArtifact({ outDir, skipSetup, downloadLink: metadata.win32, id: 'nodeguiqt' });
  }, TIMEOUT);

  test('check if output path is same as specified: ', () => {
    expect(outPath).toBe(outDir);
  });

  test('check if qt exists', () => {
    const expectedPath = `5.13.0/msvc2017_64`;
    const doesQtExist = fs.existsSync(path.resolve(outDir, expectedPath));
    expect(doesQtExist).toBe(true);
  });
});
