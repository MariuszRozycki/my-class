export function createBodyJson(method, data) {
  let body;
  if (method !== 'GET' && data) {
    body = JSON.stringify(data);
  }

  return body;
}

