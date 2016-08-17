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
 * Retrieves details about a user-shield association.
 * The connection information is taken from config.js
 */
var readUserShieldAssociation = function(username) {
  console.info("Using the /shieldassociation/byuser/ REST endpoint to obtain information about a shield...");
  var reqUrl = config.api + "/shieldassociation/byuser/" + username;

  console.info("Using URL " + reqUrl);

  request({
    url: reqUrl,
    method: "GET",
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tRead shieldassociation failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tRead shieldassociation failed. Reason is: " + response.statusCode);
    }

    if (body) {
      console.dir(body);
    }
  });
};

var args = process.argv;

if (args.length < 3) {
    console.log("Please specify username");
} else {
	console.log("Reading user association " + args[2]);
	readUserShieldAssociation( args[2]);
}
