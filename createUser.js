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
 * Creates a user in the IoT4I system.
 * The connection information is taken from config.js
 */
var createUser = function(user) {
  console.info("Using the /user REST endpoint to create a new user..." );
  
  request({
    url: config.api + "/user",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: user,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tCreate user failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tCreate user failed. Reason is: " + response.statusCode);
    }
    else {
      console.info("Succesfully created user " + user.username);
    }

    if (body) {
      console.dir(body);
    }
  });
};

// Create a sample user. If a user with the same username exists in the database the function will fail.
var user = { "username": "<tbd>",
  "fullname": "John Doe",
  "firstname": "John",
  "lastname": "Doe",
  "password": "user1234",
  "accessLevel": 100, // set to 10 for users that have dashboard access
  "address": "42 Wallaby Way, Sydney",
  "email": "user@example.com",
  "deviceId": "<tbd>",
  "deviceType": "wink",
  "type": "wink"
};

var args = process.argv;

if (args.length < 3) {
    console.log("Please specify user id");
} else {
	var userid = args[2];

	user.username = "user"+userid;
	user.deviceId = "demoDevice"+userid;
	
	console.log("Creating user user" + user.username + " with device " + user.deviceId);
	
	csrfRequests.requestAPIWithCSRF(createUser, user);
}


