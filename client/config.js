/* Environment defaults to production if none is specified */
const env = process.env.NODE_ENV || 'production';

/* Configuration bindings for each environment.
Just set the NODE_ENV when the environment is initialized,
and the relevant configuration will be exported from this file. */

const development = {
  port: process.env.PORT_DEV,
  host: process.env.HOST_DEV
};

const production = {
  port: process.env.PORT,
  host: process.env.HOST
}

/* Exporting the relevant settings from the file,
based on NODE_ENV */

const config = {
 development,
 production
};

const url = config[env].port ? `${config[env].host}:${config[env].port}` : `${config[env].host}`;

export default url;