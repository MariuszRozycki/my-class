export function renderDateAndTime(date) {

  let dateInNorway = new Date(date);

  const localDate = dateInNorway.toLocaleDateString('en-GB');
  const localTime = dateInNorway.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  dateInNorway = `${localDate} ${localTime}`;

  return dateInNorway;
}