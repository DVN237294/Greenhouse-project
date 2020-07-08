const b = require('bonescript');
const config = require('../config');

class PwmLight {
    /**
     * Set the current light intensity of the pwm light.
     * @param {number} intensity - The light intensity as a value between 0 and 1
     */
    static setLightIntensity(intensity) {
        this.currentLightIntensity = intensity;
        b.analogWrite(config.PWM_LIGHT_PIN, intensity, config.PWM_LIGHT_FREQ);
    }
    /**
     * Get the current set light intensity of the pwm light.
     * @returns {string} The light intensity.
     */
    static getLightIntensity() {
        return this.currentLightIntensity || "unknown";
    }
}

module.exports = PwmLight;