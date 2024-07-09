import { registration } from "./api.js";

export function registrationNewUser() {
    const registrationButtonElement = document.getElementById('reg-button');

    registrationButtonElement.addEventListener('click', () => {
        const userLogin = document.getElementById('user-login').value;
        const userName = document.getElementById('user-name').value;
        const userPassword = document.getElementById('user-password').value;

        function replaceSymbols(string) {
            return string.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div><br /><br />');
        }

        let relaceLogin = replaceSymbols(userLogin);
        let relaceName = replaceSymbols(userName);

        registration(relaceLogin, relaceName, userPassword)
        .then((responseData) => {
            localStorage.setItem('name', responseData.user.name);
            localStorage.setItem('token', responseData.user.token);
            alert('Вы успешно зарегистрировались');
        })
        .catch((err) => {
            alert(err.message);
        })
    });
}