import { download } from './downloader';
import { extract } from './extractor';
import os from 'os';
import metadata from './metadata.json';

type SupportedOs = 'linux' | 'win32' | 'darwin';
const setupQt = async (): Promise<void> => {
  const currentOs = os.platform() as SupportedOs;
  const downloadLink = metadata[currentOs];
  const archivePath = './out/test/123/download.7zip';
  const extractDir = './out/test2/extracted';
  await download(downloadLink, archivePath, { name: 'Qt for Mac' });
  await extract(archivePath, extractDir);
};

const main = async (): Promise<void> => {
  await setupQt();
};

main()
  .then(console.log)
  .catch(console.error);
