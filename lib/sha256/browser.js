import CryptoJS from 'crypto-js';

export default function sha256(msg) {
  const result = CryptoJS.SHA256(msg);
  // TODO: make result into the same format that nodejs crypto provides so that it works from shuffle / deshuffle
  return result;
}
