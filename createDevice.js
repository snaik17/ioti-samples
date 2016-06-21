/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

var request = require("request");
var config = require("./config.js");
var csrfRequests = require("./csrfRequests.js");

/**
 * Creates a device in the IoT4I system.
 * The connection information is taken from config.js
 */
var createDevice = function(device) {
  console.info("Using the /device REST endpoint to create a new device...");

  request({
    url: config.api + "/device",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: device,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tCreate device failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tCreate device failed. Reason is: " + response.statusCode);
    }
    else {
      console.info("Successfully created device " + device.username);
    }

    if (body) {
      console.dir(body);
    }
  });
};

// Create a sample device.
var device = { "device_manufacturer": "leaksmart",
  "sensor_pod_id": "183050",
  "name": "Sensor",
  "hub_id": "393773",
  "upc_code": "waxman_sensor",
  "model_name": "leakSMART Sensor",
  "manufacturer_device_model": "leaksmart_sensor",
  "username": "user1",	// user id must exist ( see createUser.js)
  "location": "kitchen",
  "status": "online"
};

csrfRequests.requestAPIWithCSRF(createDevice, device);
