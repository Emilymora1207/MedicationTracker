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
