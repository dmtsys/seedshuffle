import sha256 from './sha256/node.js';

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
  const hash = sha256(password);

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

