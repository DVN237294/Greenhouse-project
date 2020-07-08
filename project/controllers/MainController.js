const Controller = require('./Controller');

class MainController {
  constructor(Service) {
    this.service = Service;
  }

  async apiGetAllSensorDataGET(request, response) {
    await Controller.handleRequest(request, response, this.service.apiGetAllSensorDataGET);
  }

  async apiRotateServoPOST(request, response) {
    await Controller.handleRequest(request, response, this.service.apiRotateServoPOST);
  }

  async apiSetHeaterStatusPOST(request, response) {
    await Controller.handleRequest(request, response, this.service.apiSetHeaterStatusPOST);
  }

  async apiSetLightIntensityPOST(request, response) {
    await Controller.handleRequest(request, response, this.service.apiSetLightIntensityPOST);
  }

}

module.exports = MainController;
