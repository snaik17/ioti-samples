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
 * Creates a snapshot from the test data created by generateTestData
 * The connection information is taken from config.js
 */
function createSnapshot() {
	console.log("Creating a snapshot...");

	request({
		url: config.aggregator + "/snapshot",
		method: "POST",
		jar: csrfRequests.cookieJar,
		headers: {
			"X-CSRF-Token": csrfRequests.csrfToken,
		},
		auth: config.credentials
	},
	function(error, response, body) {
		if (error) {
			console.log("Failed to create snapshot. Error is: " + error);
		}
		else if (response.statusCode != 200) {
			console.log("Failed to create snapshot. Response is: " + response.statusCode + " - " + body);
		}
		else {
			console.log("Succesfully created snapshot.");
		}
	});
}

/**
 * Creates historical test data for display in the insurance dashboard.
 * The connection information is taken from config.js
 */
function generateTestData() {
	console.log("Creating test data...");

	request({
		url: config.aggregator + "/test/generateTestData",
		method: "POST",
		jar: csrfRequests.cookieJar,
		headers: {
			"X-CSRF-Token": csrfRequests.csrfToken,
		},
		auth: config.credentials
	},
	function(error, response, body) {
		if (error) {
			console.log("Failed to create test data. Error is: " + error);
		}
		else if (response.statusCode != 200) {
			console.log("Failed to create test data. Response is: " + response.statusCode + " - " + body);
		}
		else {
			console.log("Succesfully created test data.");
			createSnapshot();
		}
	});
}

csrfRequests.requestAggregatorWithCSRF(generateTestData);
