module.exports = {
    format_date: date => {
        const month = new Date(date).getMonth() + 1;
        const day = new Date(date).getDate();
        const year = new Date(date).getFullYear();
        return `${month}/${day}/${year}`;
      },

}