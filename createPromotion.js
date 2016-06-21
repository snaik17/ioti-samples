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

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * Creates a promotion in the IoT4I system. The promotion is visible in the mobile application.
 * The connection information is taken from config.js
 */
var createPromotion = function(promotion) {
  console.info("Using the /promotion REST endpoint to create a new promotion...");

  request({
    url: config.api + "/promotion",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: promotion,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tCreate promotion failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tCreate promotion failed. Reason is: " + response.statusCode);
    }
    else {
      console.info("Successfully created promotion " + promotion.title);
    }

    if (body) {
      console.dir(body);
    }
  });
};

// Create a sample promotion.
var promotion = { "title": "Promotion no. 9",
  "description": "Contact one of our authorized plumbers to install your water leak detection solution today",
  "buttonTitle": "Call Now",
  "type": 1,
  "phone": "+97248296343",
  "username": "user",
};

csrfRequests.requestAPIWithCSRF(createPromotion, promotion);
