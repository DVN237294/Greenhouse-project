/**
 * @file Manages the "window" motor via PWM
 * @author David V. Nielsen <237294@via.dk>
 * Date: 25-11-2019
 */
const b = require('bonescript');
const config = require('../config');

class Servo {
    /**
     * Set the window position.
     * @param {string} position - The position. Either 'Open' or 'Closed'. 
     */
    static rotateServo(position) {
        this.currentPositionFriendly = position;
        this.currentPosition = config.SERVO_POSITIONS[position];
        b.analogWrite(config.SERVO_PIN, config.SERVO_POSITIONS[position], config.SERVO_FREQ);
    }
    /**
     * Get the window position.
     * @returns {string} The position. Either 'Open' Or 'Closed'.
     */
    static getPositionFriendly() {
        return this.currentPositionFriendly || "Closed";
    }
}

module.exports = Servo;