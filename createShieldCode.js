/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

var request = require("request");
var fs = require("fs");
var config = require( "./config.js");
var csrfRequests = require("./csrfRequests.js");

/**
 * Adds the Java Script code for an existing shield in the IoT4I system.
 * The connection information is taken from config.js
 */
var createShieldCode = function(shieldCode) {
  console.info("Using the /shieldcode REST endpoint to create a new shield code...");

  request({
    url: config.api + "/shieldcode",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: shieldCode,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tCreate shield code failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tCreate shield code failed. Reason is: " + response.statusCode);
    }
    else {
      console.log("Succesfully created shield code " + shieldCode.id);
    }

    if (body) {
      console.dir(body);
    }
  });
};

var code = fs.readFileSync("./resource/shieldCode.js");

// Create a sample shield code.
var shieldCode = {
  "id": "demoshield",
  "shieldUUID": "26",	// the shield must exist, see createShield.js
  "type": "shield",
  "code": code.toString()
};

csrfRequests.requestAPIWithCSRF(createShieldCode, shieldCode);
