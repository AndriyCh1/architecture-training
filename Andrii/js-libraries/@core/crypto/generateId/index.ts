import crypto from 'crypto';

export const generateId = (size = 16) => {
  return crypto.randomBytes(size).toString('hex');
};
