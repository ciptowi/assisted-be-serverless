require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_DB_HOST,
    port: process.env.CI_DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: 'postgres',
    password: 'BeP@fYEgVrA4D3L',
    database: 'postgres',
    host: 'db.skedcpjvuwveaimonxgz.supabase.co',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    }
  }
};