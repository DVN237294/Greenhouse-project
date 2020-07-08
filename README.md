# EOS Course Project - Greenhouse 

## Quick-start
1. Copy the `project`folder to the beaglebone
2. Run the `index.js` file in `project` with `node`
3. Open the page at `http://<beaglebone_ip>:3200/`
4. (optional) View the API documentation at `http://<beaglebone_ip>:3200/api-docs`

I used the batch script `publish.bat` to copy files with `rsync`but it requires [WSL](https://docs.microsoft.com/en-us/windows/wsl/about) and [WSL Ubuntu terminal](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6) 

## Description

Since the requirements for this project is relatively loose, I decided to try an "API spec"-first approach to developing the webpage and backend.

I started by defining the API needed to get the sensor data according to the OpenAPI 3.0 specification. The result is seen in the `openapi.json` file. 
The file defines the API endpoints and models needed.
Next step is to use the [OpenAPI generator tool](https://github.com/OpenAPITools/openapi-generator) to auto generate code for a server in the express framework and a client in angular.
Last step is to implement the view in angular and business logic code in express.

As I used a generator, most of the code in the project is actually auto-generated and (more or less) only the following files were written and/or modified by me:
* `project/devices/*`
* `project/services/MainService.js`
* `project/config.js`
* `project/expressServer.js`
* `project/client/src/app/*`
* `project/client/src/environments/*`

As such not everything is commented/documented
  

## PIN Map
|           | PIN:  | Note                        |
|-----------|-------|-----------------------------|
| Servo     | P9_21 | For "window" control        |
| PWM Light | P9_14 | LED PWM light               |
| I2C Clock | P9_19 | For HIH8120 module          |
| I2C Data  | P9_20 | For HIH8120 module          |
| LDR       | P9_39 | Analog read of light sensor |
| LED       | P9_23 | GPIO for "heater" control   |

