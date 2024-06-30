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
        <a class="a-white" href="index.html">Перейти на страницу комментариев</a>
        <a class="a-white" href="auth.html">Перейти на страницу авторизации</a>
      </div>
      <div id="uploading-data" class="uploading-data">
        <img class="uploader" src="loader.gif" alt="Индикатор загрузки" />
        <p>Выполняется регистрация...</p>
      </div>
    `;

    regFormElement.innerHTML = regFormHtml;
}