const path = require('path');

const config = {
  ROOT_DIR: __dirname,
  URL_PORT: 3200,
  URL_PATH: 'http://localhost',
  BASE_VERSION: 'v2',
  CONTROLLER_DIRECTORY: path.join(__dirname, 'controllers'),
  SERVO_PIN: 'P9_21',
  SERVO_FREQ: 50,
  SERVO_POSITIONS:
  {
    "Open": 0.05,  // 1ms/20ms for 50hz freq
    "Closed": 0.1
  },
  PWM_LIGHT_PIN: 'P9_14', //Can't use the same pwmchip as servo, as only one period can be set per chip
  PWM_LIGHT_FREQ: 2000,
  HIH8120_I2C_BUS: '/dev/i2c-2',
  HIH8120_I2C_ADDRESS: 0x27,
  LDR_PIN: 'P9_39',
  HEATER_PIN: 'P9_23'
};
config.OPENAPI_YAML = path.join(config.ROOT_DIR, 'api', 'openapi.yaml');
config.FULL_PATH = `${config.URL_PATH}:${config.URL_PORT}/${config.BASE_VERSION}`;
module.exports = config;
