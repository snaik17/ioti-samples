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
 * Deletes the specified user in the IoT4I system.
 * The connection information is taken from config.js
 */
var deleteUser = function(userid) {
  console.info("Using the /user REST endpoint to create a new user..." );
  
  request({
    url: config.api + "/user/" + userid,
    method: "DELETE",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tDelete user failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tDelete user failed. Reason is: " + response.statusCode);
    }
    else {
      console.info("Succesfully Delete user " + userid);
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
	console.log("Deleting user " + args[2]);
	csrfRequests.requestAPIWithCSRF(deleteUser, args[2]);
}
