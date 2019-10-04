import fs = require('fs-extra');
import { TabletSchema } from './schema';

const TOOL_VERSION = require('../../package.json').version;

export function newTablet(): TabletSchema {
  return {
    version: '1',
    toolVersion: TOOL_VERSION,
    snippets: {}
  };
}

export async function saveTablet(tablet: TabletSchema, filename: string) {
  await fs.writeJson(filename, tablet, { encoding: 'utf-8' });
}

export async function loadTable(filename: string): Promise<TabletSchema> {
  const obj = await fs.readJson(filename, { encoding: 'utf-8' });

  if (!obj.toolVersion || !obj.snippets) {
    throw new Error(`File '${filename}' does not seem to be a Tablet file`);
  }
  if (obj.toolVersion !== TOOL_VERSION) {
    throw new Error(`Tablet file '${filename}' has been created with version '${obj.toolVersion}', cannot read with current version '${TOOL_VERSION}'`);
  }

  return obj;
}