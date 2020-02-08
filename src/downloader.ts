import fetch from 'node-fetch';
import util from 'util';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import mkdirp from 'mkdirp';
import Progress from 'progress';

const streamPipeline = util.promisify(stream.pipeline);

function progressBar(tokens: string, total: number): stream.PassThrough {
  const pt = new stream.PassThrough();
  const bar = new Progress(tokens, { total });
  pt.on('data', chunk => bar.tick(chunk.length));
  return pt;
}

export async function download(link: string, outPath: string, options: DownloadOptions = {}): Promise<void> {
  const name = options.name || '';
  const response = await fetch(link);
  if (!response.ok) {
    throw new Error(`Error while downloading ${name}:${link}. ${response.statusText}`);
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

type DownloadOptions = { name?: string };
