const addDate = (date) => {
  let dateFormat = date.toString();

  // get last char of date string
  const lastChar = dateFormat.charAt(dateFormat.length - 1);

  if (lastChar === "1" && dateFormat !== "11") {
    dateFormat = `${dateFormat}st`;
  } else if (lastChar === "2" && dateFormat !== "12") {
    dateFormat = `${dateFormat}nd`;
  } else if (lastChar === "3" && dateFormat !== "13") {
    dateFormat = `${dateFormat}rd`;
  } else {
    dateFormat = `${dateFormat}th`;
  }

  return dateFormat;
};

// Sitting the function that takes two arguments: timestamp and an options object that contains monthLength and dateSuffix properties.

module.exports = (
  timestamp,
  { monthLength = "short", dateSuffix = true } = {}
) => {
  // create month object
  const months = {
    0: monthLength === "short" ? "Jan" : "January",
    1: monthLength === "short" ? "Feb" : "February",
    2: monthLength === "short" ? "Mar" : "March",
    3: monthLength === "short" ? "Apr" : "April",
    4: monthLength === "short" ? "May" : "May",
    5: monthLength === "short" ? "Jun" : "June",
    6: monthLength === "short" ? "Jul" : "July",
    7: monthLength === "short" ? "Aug" : "August",
    8: monthLength === "short" ? "Sep" : "September",
    9: monthLength === "short" ? "Oct" : "October",
    10: monthLength === "short" ? "Nov" : "November",
    11: monthLength === "short" ? "Dec" : "December",
  };
};
