import { download } from './downloader';
import { extract } from './extractor';
import metadata from './metadata.json';
import tempy from 'tempy';

type SupportedOs = 'linux' | 'win32' | 'darwin';
type SetupOptions = {
  qtDir: string;
  downloadLink?: string;
  osType: SupportedOs;
};

export async function setupQt(options: SetupOptions): Promise<string> {
  const downloadLink = options.downloadLink || metadata[options.osType];
  const archivePath = tempy.file({ extension: '7z' });
  const extractDir = options.qtDir;
  await download(downloadLink, archivePath, { name: 'Qt for Mac' });
  await extract(archivePath, extractDir);
  console.log(`Mini Qt was setup successfully.  QtDir: ${extractDir}`);
  return extractDir;
}
