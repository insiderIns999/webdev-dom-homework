const authorizationURL = 'https://wedev-api.sky.pro/api/user/login';

export let token;
export const updateToken = (newToken) => {
  token = newToken;
};

const apiURL = 'https://wedev-api.sky.pro/api/v2/oleg-gagarin/comments';

export function takeAndRender() {
  return fetch(apiURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
};

export function addComment({ text }) {

    return fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify({
        'text': text,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        forceError: true,
      })
    });
};

export function login({ login, password }) {

  return fetch(authorizationURL, {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
    })
  })
  .then((response) => {
    return response.json();
  });
};