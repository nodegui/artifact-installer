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
  cacheDir?: string;
  osType: SupportedOs;
};

export async function setupQt(options: SetupOptions): Promise<string> {
  const downloadLink = options.downloadLink || metadata[options.osType];
  const cacheDir = options.cacheDir || appPaths.cache;
  const archivePath = path.resolve(cacheDir, path.basename(downloadLink));
  const extractDir = options.qtDir;
  await download(downloadLink, archivePath, { name: 'Mini Qt', skipIfExist: true });
  await extract(archivePath, extractDir);
  console.log(`Mini Qt was setup successfully.  QtDir: ${extractDir}`);
  return extractDir;
}
