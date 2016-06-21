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
 * Checks the login status of the current user.
 */
var checkLogin = function() {
  console.info("Using the /checkuser/login REST endpoint to perform authentication...");

  request({
    url: config.api + "/checkuser/login",
    method: "GET",
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tRequest failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tRequest failed. Reason is: " + response.statusCode);
    }
    else {
      console.info("Authenticated.");
    }

    if (body) {
      console.dir(body);
    }
  });
};

checkLogin();
