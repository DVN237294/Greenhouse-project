/**
 * @file Manages the "heater" module via the GPIO pins
 * @author David V. Nielsen <237294@via.dk>
 * Date: 25-11-2019
 */
const b = require('bonescript');
const config = require('../config');

class Heater {
    /**
     * Initialize the heater by setting pinMode to output of the pin configured in config
     */
    static heaterInit() {
        b.pinMode(config.HEATER_PIN, b.OUTPUT);
        config.HEATER_STATUS_MAP = {
            "On": b.HIGH,
            "Off": b.LOW
        }
    }
    /**
     * Turns on or off the heater
     * @param {string} status - The heater status. 'On' or 'Off' 
     */
    static setHeater(status) {
        this.heaterStatus = status;
        b.digitalWrite(config.HEATER_PIN, config.HEATER_STATUS_MAP[status]);
    }
    /**
     * Get the current heater status
     * @returns {string} The heater status. 'On' or 'Off' 
     */
    static getHeaterStatus() {
        return this.heaterStatus || "Off";
    }
}

Heater.heaterInit();
module.exports = Heater;