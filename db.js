const mysql = require('mysql2');

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourusername',
    password: 'yourpassword',
    database: 'blood_bank_db'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Exporting the db object with a query function
module.exports = {
    query: (sql, params, callback) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return callback(err);
            }
            callback(null, results);
        });
    },
    close: () => {
        db.end(err => {
            if (err) {
                console.error('Error closing the database connection:', err);
            } else {
                console.log('Database connection closed.');
            }
        });
    }
};
