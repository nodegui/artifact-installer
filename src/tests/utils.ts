import path from 'path';

export const TIMEOUT = 60000;
export const outputDir = (osName: string): string => path.resolve(__dirname, '..', '..', 'out', osName);
