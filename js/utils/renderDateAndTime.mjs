/**
 * Function renderDateAndTime converts a given date string to a localized date and time string.
 * It uses 'en-GB' locale to format the date and time.
 *
 * @function renderDateAndTime
 * @param {string} date - The date string to be converted.
 * @returns {string} dateInNorway - The localized date and time string.
 * 
 * @example
 * const myDate = "2022-09-11T12:34:56Z"; (created catch from API)
 * const localDate = renderDateAndTime(myDate);
 * 
 * This will return a string like "11/09/2022 13:34" depending on the local time zone.
 */

export function renderDateAndTime(date) {

  let dateInNorway = new Date(date);

  const localDate = dateInNorway.toLocaleDateString('en-GB');
  const localTime = dateInNorway.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  dateInNorway = `${localDate} ${localTime}`;

  return dateInNorway;
}