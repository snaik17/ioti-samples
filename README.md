API Examples
======
Documents the end to end scenario for registering user, devices, shields and generating events for the devices.

Usage
------
 1. Run the command `node createUser.js` to create a user.
 2. Run `node createShield.js` to create a shield.
 3. Run the command `node createShieldCode.js` to create a shield code based on the `resources/shieldCode.js` example.
 4. Then run the command `node createUserShieldAssociation.js` to associate the user created in step 1 with the shield created in step 2.
 5. Use the `node simulateHazard.js` command to trigger an event.
 

 See [IBM IoT for Insurance] (https:// console.ng.bluemix.net/docs/services/IotInsurance/index.html) for more details. 
