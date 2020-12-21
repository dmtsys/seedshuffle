import CryptoJS from 'crypto-js';

export default function sha256(msg) {
  const hash = CryptoJS.SHA256(msg);
  return wordToByteArray(hash.words);
}

function wordToByteArray(wordArray) {
  const byteArray = [];
  for (const word of wordArray)
    for (let j = 3; j >= 0; --j)
      byteArray.push((word >> (8 * j)) & 0xff);
  return byteArray;
}
