/* Generates the API URL used by the frontend,
based on the Node environment. */

const env = process.env.NODE_ENV || 'production';
const url = env === 'production' ? process.env.HOST : process.env.HOST_DEV + ':' + process.env.PORT_DEV;
export default url;