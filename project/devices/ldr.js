/**
 * @file Reads the analog input from the LDR
 * @author David V. Nielsen <237294@via.dk>
 * Date: 25-11-2019
 */
const b = require('bonescript');
const config = require('../config');

class Ldr {
    /**
     * Get the measured light intensity
     * @returns {Promise<number>} A Promise providing the measured light intensity
     */
    static getLightIntensity() {
        return new Promise((resolve, reject) => {
            b.analogRead(config.LDR_PIN, x => {
                resolve(x.value);
            });
        });
    }
}

module.exports = Ldr;