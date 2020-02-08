import { unpack } from '7zip-min';
import util from 'util';
import fs from 'fs';

const unpack7z = util.promisify(unpack);
const fsExist = util.promisify(fs.exists);

export async function extract(archivePath: string, outDir: string): Promise<void> {
  console.log(`Extracting ${archivePath} to ${outDir} ...`);
  if (!(await fsExist(archivePath))) {
    throw new Error(`Archive ${archivePath} doesnt exist!!`);
  }
  await unpack7z(archivePath, outDir);
  return;
}
