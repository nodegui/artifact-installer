import { download } from './downloader';
import { extract } from './extractor';
import path from 'path';
import metadata from './metadata.json';
import envPaths from 'env-paths';

const appPaths = envPaths('nodegui-qt');

type SupportedOs = 'linux' | 'win32' | 'darwin';
type SetupOptions = {
  qtDir: string;
  downloadLink?: string;
  osType: SupportedOs;
};

export async function setupQt(options: SetupOptions): Promise<string> {
  const downloadLink = options.downloadLink || metadata[options.osType];
  const archivePath = path.resolve(appPaths.cache, path.basename(downloadLink));
  const extractDir = options.qtDir;
  await download(downloadLink, archivePath, { name: 'Qt for Mac', skipIfCached: true });
  await extract(archivePath, extractDir);
  console.log(`Mini Qt was setup successfully.  QtDir: ${extractDir}`);
  return extractDir;
}
