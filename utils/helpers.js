// module.exports = {
//     format_date: date => {
//         const month = new Date(date).getMonth() + 1;
//         const day = new Date(date).getDate();
//         const year = new Date(date).getFullYear();
//         return `${month}/${day}/${year}`;
//       },

// }

module.exports = {
  // the helper method 'format_time' will take in a timestamp and return a string with only the time
  format_time: (date) => {
    // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
    //return date.toLocaleTimeString();
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
};
