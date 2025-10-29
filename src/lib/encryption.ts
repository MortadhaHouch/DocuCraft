// src/lib/encryption.ts
import crypto from 'crypto-js';
import "dotenv/config"
import { Session } from '../../utils/validators/sessionValidator';
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_SESSION_ENCRYPTION_KEY || 'session-encryption-key';

export function encryptSession(session: Session): string {
    const sessionString = JSON.stringify(session);
    return crypto.AES.encrypt(sessionString, ENCRYPTION_KEY).toString();
}

export function decryptSession(encryptedSession: string) {
    const bytes = crypto.AES.decrypt(encryptedSession, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
}