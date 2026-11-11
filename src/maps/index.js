import { buildOldQuarter } from './oldQuarter.js';
import { buildIndustrial } from './industrial.js';

export const MAP_BUILDERS = {
  'old-quarter': buildOldQuarter,
  industrial: buildIndustrial,
};

export function buildMap(id, scene, materials) {
  const builder = MAP_BUILDERS[id] || MAP_BUILDERS['old-quarter'];
  return builder(scene, materials);
}
