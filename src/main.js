// open csv file liste_deputes.csv
// index from first column
// open file scrutin
// load json
// for each depute in CSV


import fs from 'fs';
import csv from 'csv-parser';

import writeDepute from './depute.js';

const filePath = '../resources/liste_deputes.csv';

try {
  const scrutinFile = fs.readFileSync('../resources/VTANR5L17V455.json', 'utf8');
  const scrutinData = JSON.parse(scrutinFile);
  // Open and process the CSV file
  fs.createReadStream(filePath)
    .pipe(csv()) // Automatically treats the first line as the header
    .on('data', (row) => {
      writeDepute(row, scrutinData);
    })
    .on('end', () => {
      console.log('CSV file successfully processed.');
    })
    .on('error', (err) => {
      console.error('Error reading the file:', err.message);
    });
} catch (err) {
  console.error('Error reading the file:', err.message);
}

