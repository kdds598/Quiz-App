import { openDB } from "idb";

const DB_NAME = "QuizHistoryDB";
const STORE_NAME = "quizAttempts";

// Initialize IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

// Save Quiz Attempt (Prevent Duplicates)
export const saveQuizAttempt = async (attemptData) => {
  const db = await initDB();
  const existingAttempts = await db.getAll(STORE_NAME);

  // Check if an attempt with the same timestamp already exists
  const isDuplicate = existingAttempts.some((attempt) => attempt.timestamp === attemptData.timestamp);

  if (!isDuplicate) {
    await db.put(STORE_NAME, attemptData);
  }
};

// Get Quiz History (Ensure Unique Entries)
export const getQuizHistory = async () => {
  const db = await initDB();
  const attempts = await db.getAll(STORE_NAME);

  // Remove duplicates by ensuring unique timestamps
  const uniqueAttempts = Array.from(new Map(attempts.map((item) => [item.timestamp, item])).values());

  return uniqueAttempts;
};

// Clear Quiz History
export const clearQuizHistory = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
