const authorizationURL = 'https://wedev-api.sky.pro/api/user/login';
const regURL = 'https://wedev-api.sky.pro/api/user';

export let token; //= localStorage.getItem('token');
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
        forceError: true,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    if(response.status === 400) {
      throw new Error('Неверный логин или пароль');
    }
    if(response.status === 500) {
      throw new Error('Сервер упал');
    }
    return response.json();
  });
};

export function registration({ login, name, password }) {
  console.log(login, name, password);
  return fetch(regURL, {
    method: 'POST',
    body: JSON.stringify({
      login,
      name,
      password,
    })
  })
  .then((response) => {
    if(response.status === 400) {
      throw new Error('Пользователь с таким логином уже зарегистрирован');
    }
    if(response.status === 500) {
      throw new Error('Сервер упал');
    }
    return response.json();
  });
};