import { shuffle, deshuffle } from './seedshuffle';
import sha256 from './sha256/browser.js';

export default {
  shuffle: (...options) => {
    shuffle(...options, { sha256 });
  },
  deshuffle: (...options) => {
    deshuffle(...options, { sha256 });
  }
};
