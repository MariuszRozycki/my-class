/**
 * Creates a JSON body for an HTTP request based on the given method and data.
 * 
 * @function createBodyJson
 * @param {string} method - The HTTP method ('GET', 'PUT', 'POST', 'DELETE').
 * @param {Object} [data] - Optional data to be converted to JSON string.
 * @returns {string|null} - A JSON string if method is not 'GET' and data is provided, otherwise null.
 * 
 * @example  
 * // Example usage:
 * const method = 'POST';
 * const data = { key: 'value' };
 * const body = createBodyJson(method, data); 
 * Returns '{"key":"value"}'
 */

export function createBodyJson(method, data) {
  let body;
  if (method !== 'GET' && data) {
    body = JSON.stringify(data);
  }

  return body;
}

