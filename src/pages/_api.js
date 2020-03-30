import { apiHost } from './_constants.js';
import { user } from './_store.js';

export let auth_token;

user.subscribe((value) => auth_token = value);

export async function getData(endpoint) {
  return await fetch(`${apiHost}${endpoint}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Authorization': `Bearer ${auth_token}`,
    },
  });
}

export async function getJson(endpoint) {
  const response = await getData(endpoint);

  if (response.ok) {
    return await response.json();
  } else {
    console.log('error', await response.text());
  }
}

export async function postJson(endpoint, body) {
  return await fetch(`${apiHost}${endpoint}`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
}

export async function postJsonWithAuth(endpoint, body) {
  return await fetch(`${apiHost}${endpoint}`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Authorization': `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
}