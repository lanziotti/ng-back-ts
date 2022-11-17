import knex from "knex";

const port = process.env.DB_PORT as number | undefined

const connection = knex({
    client: 'pg',
    connection: {
        uri: process.env.DB_URI   
    }
});

export default connection;