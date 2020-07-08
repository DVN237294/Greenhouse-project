/**
 * @file Manages the H1H8120 module
 * @author David V. Nielsen <237294@via.dk>
 * Date: 25-11-2019
 */
const b = require('bonescript');
const config = require('../config');
const path = require('path');
const execFile = require('child_process').execFile;
const log = require('../logger');
const EOL = require('os').EOL;

/**
 * I was unable to get the i2c API in bonescript to work, so I ended up utilizing the
 * 'Humidity' binary from itslearning to interact with the Hih8120 module
 */
/**
 * @typedef {Object} TemperatureData
 * @property {string} temp - The string representation of temperature
 * @property {string} humidity - The string representation of humidity
 */
class Hih8120 {
    /**
     * Get the humidity and temperature data.
     * @returns {TemperatureData} The temperature data
     */
    static getHumidityTemperature() {
        return new Promise((resolve, reject) => {
            const binFile = path.join(__dirname, '..', 'bin-utils', 'Humidity');
            execFile(binFile, (error, stdout, stderr) => {
                if (error) {
                    log.error("Humidity bin-util failed: " + stderr);
                }
                var outputSplit = stdout.split(EOL);
                if (outputSplit.length >= 2) {
                    resolve({
                        temp: outputSplit[0],
                        humidity: outputSplit[1]
                    });
                }
                reject();
            });
        });
    }
}

module.exports = Hih8120;