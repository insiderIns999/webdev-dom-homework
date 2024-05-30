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
        forceError: true
      })
    });
};