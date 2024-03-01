 class helper{
    getMonthNameFromIndex (monthId) {
    if (monthId == 1) {
      return "January";
    } else if (monthId == 2) {
      return "February";
    } else if (monthId == 3) {
      return "March";
    } else if (monthId == 4) {
      return "April";
    } else if (monthId == 5) {
      return "May";
    } else if (monthId == 6) {
      return "June";
    } else if (monthId == 7) {
      return "July";
    } else if (monthId == 8) {
      return "August";
    } else if (monthId == 9) {
      return "September";
    } else if (monthId == 10) {
      return "October";
    } else if (monthId == 11) {
      return "November";
    } else if (monthId == 12) {
      return "December";
    } else {
      return "Invalid";
    }
  };
}

export default helper