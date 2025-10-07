import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
dotenv.config();
const serviceAccount = JSON.parse(
  await readFile(new URL("../serviceAccountKey.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
// Storage bucket instance
// export const bucket = admin.storage().bucket();
