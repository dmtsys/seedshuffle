import { shuffle, deshuffle } from './seedshuffle';
import sha256 from './sha256/node.js';

function log(b, n) {
  return Math.log(n) / Math.log(b);
}

function factorial(n) {
  return n == 1 ? 1 : n * factorial(n - 1);
}

const mnemonic =
  'endorse dignity they west worth thank drastic can eyebrow scan neither diagram tiger broken saddle unknown genius finger trumpet ride delay remain hard inside';

const password = 'PASSWORD123';

const shuffled = shuffle(mnemonic, password, { sha256 });

console.log(`Mnemonic: ${mnemonic}`);
console.log(`Shuffled: ${shuffled}`);
console.log(`Password: ${password}`);

const deshuffled = deshuffle(shuffled, password, { sha256 });

//console.log(`Deshuffled: ${deshuffled}`);

if (mnemonic != deshuffled) {
  console.log(`BUG IN ALGORITHM -> CHECK! ${mnemonic}`);
}

// security info
console.log(`Security: ${Math.floor(log(2, factorial(mnemonic.split(' ').length)))} bits`);
