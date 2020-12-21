import CryptoJS from 'crypto-js';

function sha256(msg) {
  return CryptoJS.SHA256(msg)
}

console.log(sha256('mooo'));
