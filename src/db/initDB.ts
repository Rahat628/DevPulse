import pg from "pg"
import config from "../config"

export const pool = new pg.Pool({
    connectionString: config.connectionString
})

export const initDB = async () => {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(15) DEFAULT 'contributor',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`)

    console.log("User Database Initialized Successfully")

    await pool.query(`
        CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description VARCHAR(255) NOT NULL CHECK (char_length(description) >= 20),
        type VARCHAR(20),
        status VARCHAR(15) DEFAULT 'open',
        reporter_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)

        console.log("Issues Database Initialized Successfully")

}