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
 * Associates an existing user with an existing shield in the IoT4I system.
 * The connection information is taken from config.js
 */
var createUserShieldAssociation = function(userShield) {
  console.info("Using the /shieldassociation REST endpoint to associate a user with a shield...");

  request({
    url: config.api + "/shieldassociation",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: userShield,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.log("\tOperation failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.log("\tOperation failed. Reason is: " + response.statusCode);
    }
    else {
      console.log("Successfully associated user " + userShield.username + " with shield " + userShield.shieldUUID);
    }

    if (body) {
      console.dir(body);
    }
  });
};

var userShield = {
  "shieldUUID": "1", // 1 is a predefined water leak shield in the database. You can also use the ID from createShield.js
  "username": "user1", // user id must exist ( see createUser.js)
  "hazardDetectionOnCloud": true
};

csrfRequests.requestAPIWithCSRF(createUserShieldAssociation, userShield);
