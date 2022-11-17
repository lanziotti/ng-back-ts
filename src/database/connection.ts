import knex from "knex";

const connection = knex({
    client: 'pg',
    connection: {
        uri: process.env.DB_URI   
    }
});

export default connection;