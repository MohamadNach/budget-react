export const formatDate = (dateString: string)=> {
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dayName = weekdayNames[date.getDay()];
  const monthName = monthNames[month];

  return `${dayName} ${monthName} ${day} ${year}`;
  
}