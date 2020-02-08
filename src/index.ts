import fetch from 'node-fetch';
import util from 'util';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import { mkdirp } from 'fs-extra';
import Progress from 'progress';

const streamPipeline = util.promisify(stream.pipeline);

function progressBar(tokens: string, total: number): stream.PassThrough {
  const pt = new stream.PassThrough();
  const bar = new Progress(tokens, { total });
  pt.on('pipe', () => {
    pt.on('data', chunk => bar.tick(chunk.length));
  });
  return pt;
}

const macOsLink =
  'https://download.qt.io/online/qtsdkrepository/mac_x64/desktop/qt5_5130/qt.qt5.5130.clang_64/5.13.0-0-201906171525qtbase-MacOS-MacOS_10_13-Clang-MacOS-MacOS_10_13-X86_64.7z';

type DownloadOptions = {
  name?: string;
};
async function downloadArchive(archiveLink: string, outPath: string, options: DownloadOptions = {}): Promise<void> {
  const name = options.name || '';
  const response = await fetch(archiveLink);
  if (!response.ok) {
    throw new Error(`Error while downloading ${name}:${archiveLink}. ${response.statusText}`);
  }
  await mkdirp(path.dirname(outPath));
  const total = parseInt(`${response.headers.get('content-length')}`, 10);
  const totalInMb = (total / 1024 / 1024).toFixed(2);
  await streamPipeline(
    response.body,
    progressBar(`Downloading ${name} [:bar] :percent of ${totalInMb}MB :etas`, total),
    fs.createWriteStream(outPath),
  );
}

const main = async (): Promise<void> => {
  await downloadArchive(macOsLink, './out/download.7zip', { name: 'Qt for Mac' });
};

main()
  .then(console.log)
  .catch(console.error);
