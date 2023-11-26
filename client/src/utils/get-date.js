export const convertTimestampToDate = (timestamp) => {
  // create a new Date using the time stamp (in milli seconds)
  const date = new Date(timestamp);

  // Extract the components of the date (year, month, day)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  //   Format the date as YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
