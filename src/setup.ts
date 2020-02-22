import { download } from './downloader';
import { extract } from './extractor';
import path from 'path';
import envPaths from 'env-paths';
import emptyDir from 'empty-dir';
import mkdirp from 'make-dir';

type SetupOptions = {
  outDir: string;
  id: string;
  downloadLink: string;
  cacheDir?: string;
  force?: boolean;
  displayName?: string;
};

export async function setupArtifact(options: SetupOptions): Promise<string> {
  const downloadLink = options.downloadLink;
  const cacheDir = options.cacheDir || envPaths(`${options.id}`).cache;
  const force = Boolean(options.force);
  const displayName = options.displayName || options.id;
  const archivePath = path.resolve(cacheDir, path.basename(downloadLink));
  const outDir = options.outDir;

  await mkdirp(outDir);

  if (!(await emptyDir(outDir)) && !force) {
    console.log(`Skipping setup for ${displayName}...`);
    return outDir;
  }

  await download(downloadLink, archivePath, { name: displayName, skipIfExist: !force });
  await extract(archivePath, outDir);
  console.log(`${displayName} was setup successfully.  outDir: ${outDir}`);
  return outDir;
}
