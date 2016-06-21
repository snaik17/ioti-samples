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

/**
 * Retrieves the shield code for the specified shield.
 * The connection information is taken from config.js
 */
var readShieldCode = function(shieldUuid) {
  console.info("Using the /shieldcode/byuuid/ REST endpoint to obtain information about a shield code...");
  var reqUrl = config.api + "/shieldcode/byuuid/" + shieldUuid;

  console.info("Using URL " + reqUrl);

  request({
    url: reqUrl,
    method: "GET",
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tRead shield code failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tRead shield code failed. Reason is: " + response.statusCode);
    }

    if (body) {
      console.dir(body);
    }
  });
};

var shieldUuid = "1";

readShieldCode(shieldUuid);
