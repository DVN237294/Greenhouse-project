/**
 * @file Main entry point for the application
 * @author David V. Nielsen <237294@via.dk>
 * Date: 25-11-2019
 */
const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');

const launchServer = async () => {
  try {
    this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    await this.expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error(error);
    await this.close();
  }
};

launchServer().catch(e => logger.error(e));
