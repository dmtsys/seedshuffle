import { createHash } from 'crypto';

export default function sha256(msg) {
  return createHash('sha256').update(msg).digest();
}
