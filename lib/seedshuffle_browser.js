import { shuffle as _shuffle, deshuffle as _deshuffle } from './seedshuffle';
import sha256 from './sha256/browser.js';

export const shuffle = (...options) => _shuffle(...options, { sha256 });
export const deshuffle = (...options) => _deshuffle(...options, { sha256 });
