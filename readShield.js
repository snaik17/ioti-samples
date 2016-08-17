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
 * Retrieves details about the specified shield.
 * The connection information is taken from config.js
 */
var readShield = function(shieldUuid) {
  console.info("Using the /shield/byuuid/ REST endpoint to obtain information about a shield...");
  var reqUrl = config.api + "/shield/byuuid/" + shieldUuid;

  console.info("Using URL " + reqUrl);

  request({
    url: reqUrl,
    method: "GET",
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tRead shield failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tRead shield failed. Reason is: " + response.statusCode);
    }

    if (body) {
      console.dir(body);
    }
  });
};

var shieldUuid = "1";	// the shield with ID 1 is predefined in the database

var args = process.argv;

if (args.length < 3) {
    console.log("Please specify shield UUID");
} else {
	console.log("Reading shield with UUID " + args[2]);
	readShield( args[2]);
}

