import { createHash } from 'crypto';

function lpad(str, padString, length) {
  while (str.length < length) str = padString + str;
  return str;
}

// converts string '1100' to integer 12
function binaryToByte(bin) {
  return parseInt(bin, 2);
}

// returns string, like: '10011'
function bytesToBinary(bytes) {
  return bytes
    .map(x => {
      return lpad(x.toString(2), '0', 8);
    })
    .join('');
}

function getChunks(password) {
  // create pseudo-random 256 bits based on password
  const hash = createHash('sha256').update(password).digest();

  // get actual bits as string, like: '10011000111...'
  const bits = bytesToBinary([].slice.call(hash));

  // separate in chunks of 5 bits (= 32 combinations)
  return bits.match(/.{1,5}/g);
}

function shuffle(mnemonic, password) {
  if (!password || password.trim() == '') {
    return mnemonic;
  }

  const chunks = getChunks(password);

  const words = mnemonic.split(' ');
  const shuffled = [];

  // Fisher–Yates shuffle:
  // The algorithm effectively puts all the elements into a hat; it continually determines the next element by randomly drawing an element from the hat until no elements remain.
  while (words.length > 0) {
    const chunk = chunks.splice(0, 1);
    const index = binaryToByte(chunk) % words.length;
    shuffled.push(words.splice(index, 1));
  }

  return shuffled.join(' ');
}

function deshuffle(shuffled, password) {
  if (!password || password.trim() == '') {
    return shuffled;
  }

  const wordCount = shuffled.split(' ').length;

  const chunks = getChunks(password).slice(0, wordCount).reverse();

  const words = shuffled.split(' ').reverse();
  const mnemonic = []; //new Array(words.length);

  while (mnemonic.length < wordCount) {
    const chunk = chunks.splice(0, 1);
    const index = binaryToByte(chunk) % (mnemonic.length + 1);
    mnemonic.splice(index, 0, words.splice(0, 1));
  }

  return mnemonic.join(' ');
}

export { shuffle, deshuffle };

if (typeof process !== 'undefined') {
  const args = process.argv.slice(2);

  if (args[0] == 'test') {
    const mnemonic =
      'endorse dignity they west worth thank drastic can eyebrow scan neither diagram tiger broken saddle unknown genius finger trumpet ride delay remain hard inside';

    const password = 'PASSWORD123';

    const shuffled = shuffle(mnemonic, password);

    console.log(`Mnemonic: ${mnemonic}`);
    console.log(`Shuffled: ${shuffled}`);
    console.log(`Password: ${password}`);

    const deshuffled = deshuffle(shuffled, password);

    //console.log(`Deshuffled: ${deshuffled}`);

    if (mnemonic != deshuffled) {
      console.log(`BUG IN ALGORITHM -> CHECK! ${mnemonic}`);
    }

    // security info

    function log(b, n) {
      return Math.log(n) / Math.log(b);
    }

    function factorial(n) {
      return n == 1 ? 1 : n * factorial(n - 1);
    }

    console.log(`Security: ${Math.floor(log(2, factorial(mnemonic.split(' ').length)))} bits`);
  }
}
