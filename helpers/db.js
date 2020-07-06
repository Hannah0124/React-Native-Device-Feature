// import * as SQLite from 'expo-sqlite';
import { SQLite } from 'expo-sqlite';

// Create the database
const db = SQLite.openDatabase('places.db');

export const init = () => {

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // id, title, imageUri column
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);', 
        [],
        // success
        () => {
          resolve();
        },
        // fail
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};