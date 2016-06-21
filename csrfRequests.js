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

var requestHandler = function(url, callback, param) {
  var cookies = csrfRequests.cookieJar.getCookies(url);

  for(var i = 0; i < cookies.length; ++i) {
    if (cookies[i].key == "XSRF-TOKEN") {
      csrfRequests.csrfToken = cookies[i].value;
    }
  }

  callback(param);
}

var csrfRequests = module.exports = {
  cookieJar: "",
	csrfToken: "",
	requestAggregatorWithCSRF: function(callback) {
		csrfRequests.cookieJar = request.jar();

		request({
			url: config.aggregator + "/schedule",
			method: "GET",
			jar: csrfRequests.cookieJar,
			auth: config.credentials
		},
		function(error, response, body) {
			requestHandler(config.aggregator, callback, body);
		});
	},
	requestAPIWithCSRF: function(callback, param) {
		csrfRequests.cookieJar = request.jar();

		request({
			url: config.api + "/user",
			method: "GET",
			jar: csrfRequests.cookieJar,
			auth: config.credentials
		},
		function(error, response, body) {
			requestHandler(config.api, callback, param);
		});
	}
};
