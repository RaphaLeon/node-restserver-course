//======================================
// Port
//======================================
process.env.PORT = process.env.PORT || 3000;


//======================================
// Environment
//======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//======================================
// DataBase
//======================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = 'mongodb://coffee-user:admin1234@ds147030.mlab.com:47030/coffee';
}

process.env.URLDB = urlDB;