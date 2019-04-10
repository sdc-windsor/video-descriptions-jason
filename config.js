require('dotenv').config()
const env = process.env.NODE_ENV;

/* Configuration bindings for each environment.
Just set the NODE_ENV when the environment is initialized,
and the relevant configuration will be exported from this file. */

const dev = {
  port: process.env.PORT_DEV,
  data: process.env.DATA_DEV,
  pg: {
    host: process.env.PG_HOST_DEV,
    user: process.env.PG_USER_DEV,
    port: process.env.PG_PORT_DEV,
    database: process.env.PG_DB_DEV,
    password: process.env.PG_PASSWORD_DEV,
  },
  cass: {
    contactPoint: process.env.CASS_CONTACTPOINT,
    localDataCenter: process.env.CASS_LDC,
    keyspace: process.env.CASS_KEYSPACE
  }
};

const test = {
  port: process.env.PORT_TEST,
  data: process.env.DATA_TEST,
  pg: {
    host: process.env.PG_HOST_TEST,
    user: process.env.PG_USER_TEST,
    port: process.env.PG_PORT_TEST,
    database: process.env.PG_DB_TEST,
    password: process.env.PG_PASSWORD_TEST,
  }
};

/* Exporting the relevant settings from the file,
based on NODE_ENV */

const config = {
 dev,
 test
};

module.exports = config[env];