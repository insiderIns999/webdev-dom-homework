import { registration } from './api.js';
import { login } from "./api.js";

export const renderAuthForm = () => {

  const regFormElement = document.getElementById('add-comment-form');

  const regFormHtml = `
  <div id="form-reg" class="add-form reg-form">
    <input id="user-name" type="text" name="name" class="add-form-name" placeholder="Введите имя" />
    <br />
    <input id="user-login" type="text" name="login" class="add-form-name" placeholder="Введите логин" />
    <br />
    <input id="user-password" type="password" name="password" class="add-form-name" placeholder="Введите пароль" />
    <div class="add-form-row reg-form-row">
      <button id="reg-button" class="add-form-button" disabled>Зарегистрироваться</button>
    </div>
    <a id="authorization-button" class="a-white" href="#">Войти</a>
  </div>
  <div id="uploading-data" class="uploading-data">
    <img class="uploader" src="loader.gif" alt="Индикатор загрузки" />
    <p>Выполняется регистрация...</p>
  </div>
  `;

  regFormElement.innerHTML = regFormHtml;

  const linkAuthElement = document.getElementById('authorization-button');
  linkAuthElement.addEventListener('click', () => {
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
            <p class="white">Если не зарегистрированы,
            <a class="a-white" id="link-reg" href="#"> Зарегистрироваться</a>
        </div>
        <div id="uploading-data" class="uploading-data">
            <img class="uploader" src="loader.gif" alt="Индикатор загрузки" />
            <p>Выполняется авторизация...</p>
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
            })
            .then((responseData) => {
                updateToken(responseData.user.token);
                updateUserName(responseData.user.name);
                return renderCommentsForm({ sendEventListener });
            })
            .catch((err) => {
                alert(err.message);
            })
        });

        const linkRegElement = document.getElementById('link-reg');

        linkRegElement.addEventListener('click', renderAuthForm);
  });

  const registrationButtonElement = document.getElementById('reg-button');

  const userLogin = document.getElementById('user-login');
  const userName = document.getElementById('user-name');
  const userPassword = document.getElementById('user-password');
  const arrInputs = [userLogin, userName, userPassword];

  for (let x = 0; x < arrInputs.length; x++) {
    arrInputs[x].addEventListener('input', () => {
        if (arrInputs.every((el) => el.value !== '')) {
            return registrationButtonElement.disabled = false;
        }
        else {
            return registrationButtonElement.disabled = true;
        }
    });
  };

  registrationButtonElement.addEventListener('click', () => {

    function replaceSymbols(string) {
      return string.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div><br /><br />');
    }

    let relaceLogin = replaceSymbols(userLogin.value);
    let relaceName = replaceSymbols(userName.value);

    registration(relaceLogin, relaceName, userPassword)
    .then(() => {
        alert('Вы успешно зарегистрировались');
    })
    .catch((err) => {
        alert(err.message);
    })
  });
}