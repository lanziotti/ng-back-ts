import knex from "knex";

const port = process.env.DB_PORT as number | undefined

const connection = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: port,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }
});

export default connection;