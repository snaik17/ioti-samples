/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

var request = require("request");
var config = require( "./config.js");
var csrfRequests = require("./csrfRequests.js");

/**
 * Creates a shield in the IoT4I system.
 * The connection information is taken from config.js
 */
var createShield = function(shield) {
  console.info("Using the /shield REST endpoint to create a new shield...");

  request({
    url: config.api + "/shield",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: shield,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.log("\tCreate shield failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tCreate shield failed. Reason is: " + response.statusCode);
    }
    else {
      console.log("Succesfully created shield " + shield.name);
    }

    if (body) {
      console.dir(body);
    }
  });
};

// Create a sample shield.
var shield = {
  "UUID": "26",	// must be unique
  "name": "demoshield",
  "type": "Environmental Measurements",
  "description": "Demo detection if there is a water leak",
  "image": "shieldWater",
  "canBeDisabled": false,
  "hazardDetectionOnCloud": true,
  "jsCodeMethod": "demoShield",	// must exist as a function in the jscode for the shield code
  "services": [],
  "shieldHazards": [
    "DemoHazard"
  ],
  "shieldActions": [
    "DemoAction"
  ],
  "sensorType": [
    "demoDetector"
  ],
  "potentialClaimAmount": "10",
  "shieldParameters": []
};

csrfRequests.requestAPIWithCSRF(createShield, shield);
