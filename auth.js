import { login } from './api.js';
import { token } from './api.js';
import { updateToken } from './api.js';
import { renderCommentsForm } from './commentForm.js';
import { sendEventListener } from './sendEventListener.js';

import { userNameFromApi } from './commentForm.js';
import { updateUserName } from './commentForm.js';

export const authForm = () => {

    const authorizationButtonElement = document.getElementById('authorization-button');

    authorizationButtonElement.addEventListener('click', () => {

        const commentsElement = document.getElementById('user-comments');
        commentsElement.style.display = 'none';

        const authFormElement = document.getElementById('add-comment-form');

        const authFormHtml = `
            <div id="form-auth" class="add-form auth-form">
            <input id="user-login" type="text" name="login" class="add-form-name" placeholder="Введите логин" />
            <br />
            <input id="user-password" type="password" name="password" class="add-form-name" placeholder="Введите пароль" />
            <div class="add-form-row auth-form-row">
            <button id="auth-button" class="auth-form-button add-form-button" disabled>Войти</button>
            </div>
            <a href="index.html">Перейти на страницу комментариев</a>
            <p>Если не зарегистрированы,
            <a href="reg.html"> Зарегистрироваться</aa>
            </ap>
        </div>
        <div id="uploading-data" class="uploading-data">
            <img class="uploader" src="loader.gif" alt="Индикатор загрузки" />
            <p>Выполняется регистрация...</p>
        </div>
        `;

        authFormElement.innerHTML = authFormHtml;

        const buttonElement = document.getElementById('auth-button');
        const loginInputElement = document.getElementById('user-login');
        const passwordInputElement = document.getElementById('user-password');
        const userArr = [loginInputElement, passwordInputElement];

        for (let j = 0; j < userArr.length; j++) {
            userArr[j].addEventListener('input', () => {
                if (userArr.every((el) => el.value !== '')) {
                    return buttonElement.disabled = false;
                }
                else {
                    return buttonElement.disabled = true;
                }
            });
        };

        buttonElement.addEventListener('click', ({ sendEventListener }) => {
            login({
                login: loginInputElement.value,
                password: passwordInputElement.value,
            }).then((responseData) => {
                updateToken(responseData.user.token);
                updateUserName(responseData.user.name);
                return renderCommentsForm({ sendEventListener });
            })
        });
    });
}

// добавил этот коммент, чтобы обновить данные на своем репозитории