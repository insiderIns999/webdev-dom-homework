import { authForm } from "./auth.js";

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
    linkAuthElement.addEventListener('click', authForm);
}