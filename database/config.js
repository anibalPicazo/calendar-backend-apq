const mongoose = require('mongoose');

const dbConnection = () => {
    try {
        mongoose.connect(process.env.DB_CN);
        console.log('Db online');
    } catch (error) {
        console.log(error
            );
    }
}
module.exports = {
    dbConnection
}
