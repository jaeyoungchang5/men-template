/**
 * @fileoverview debuglog.js
 * This file contains a function for consistent console logging. 
 */

/**
 * @function debuglog : function to help with consistent console logging
 * @param {String} type : type of message, either LOG or DEBUG or ERROR
 * @param {String} func : function information to help identify where the log is coming from
 * @param {String} message : console log message
 */
function debuglog(type, func, message){
    console.log(`[${type}] :: ${func} :: ${message} :: ` + new Date());
}

module.exports = debuglog;