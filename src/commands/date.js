/*
  Simply returns the current time and date.
 */
let date = function() {
    return new Date().toLocaleString();
};

module.exports = date;
