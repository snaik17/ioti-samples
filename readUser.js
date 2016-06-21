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
 * Retrieves details about a user from the IoT4I system.
 * The connection information is taken from config.js
 */
var readUser = function() {
  console.info("Using the /user REST endpoint to read the specified user");
  
  var userid = "user1";

  request({
    url: config.api + "/user/" + userid,
    method: "GET",
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tRead user failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tRead user failed. Reason is: " + response.statusCode);
    }

    if (body) {
      console.dir(body);
    }
  });
};

readUser();
