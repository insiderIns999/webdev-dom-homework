const authorizationURL = 'https://wedev-api.sky.pro/api/user/login';

export let token;
export const updateToken = (newToken) => {
  token = newToken;
};

export function takeAndRender() {
  return fetch('https://wedev-api.sky.pro/api/v1/oleg-gagarin/comments', {
    method: 'GET',
  })
};

export function addComment({ name, text }) {

    console.log();

    return fetch('https://wedev-api.sky.pro/api/v1/oleg-gagarin/comments', {
      method: 'POST',
      body: JSON.stringify({
        'name': name,
        'text': text,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        forceError: true,
      })
    });
};

export function login({ login, password }) {

  console.log(login, password);

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