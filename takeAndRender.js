export const takeAndRender = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/oleg-gagarin/comments', {
        method: 'GET',
    });
};