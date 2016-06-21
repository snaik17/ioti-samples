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
 * Updates the analytics engine with the newly created user and shields.Must be called every time a new user-shield association is created.
 * The connection information is taken from config.js
 */
var updateAnalyticsEngine = function(parameters) {
  console.info("Refreshing the shield engine shield associations ...");
  var reqUrl = config.api + "/global/sendPayloadToMQTT/" + parameters.outputtype + "/" + parameters.devicetype + "/" + parameters.deviceid + "/" + parameters.type;

  console.info("Using URL " + reqUrl);

  request({
    url: reqUrl,
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: parameters.payload,
    auth: config.credentials
  }, function (error, response, body) {
    if (error) {
      console.log("\tRequest failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.error("\tRequest failed. Reason is: " + response.statusCode);
    }
    else {
      console.log("\nRefresh succeeded.");
    }

    if (body) {
      console.dir(body);
    }
  });
};

var commandParams = {
		  "payload": {
		    },
		    "outputtype": "evt",
		    "devicetype": "API",
		    "deviceid": "API",
		    "type": "reloadShieldAssociations"
		  };

csrfRequests.requestAPIWithCSRF(updateAnalyticsEngine, commandParams);


