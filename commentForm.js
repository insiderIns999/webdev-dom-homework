import { sendDisabled } from "./sendDisabled.js";
import { sendEventListener } from "./sendEventListener.js";

export const send = document.getElementById('send');
export const userName = document.getElementById('user-name');

export const commentFieldElement = document.getElementById('user-comment');

export let userNameFromApi;
export const updateUserName = (newUserName) => {
    userNameFromApi = newUserName;
};

export const renderCommentsForm = () => {

    const commentFormElement = document.getElementById('add-comment-form');

    const commentsFormHtml = `
    <div id="form" class="add-form">
        <input id="user-name" type="text" name="name" class="add-form-name" placeholder="Введите ваше имя" />
        <textarea id="user-comment" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
        <div class="add-form-row">
            <button id="save" class="save-change-comment">Сохранить</button>
            <button id="send" class="add-form-button" disabled>Отправить</button>
        </div>
    </div>
    <a href="reg.html">Перейти на страницу регистрации</a>
    <div id="uploading-data" class="uploading-data">
        <img class="uploader" src="loader.gif" alt="Индикатор загрузки" />
        <p>Комментарий добавляется...</p>
    </div>
    `;

    commentFormElement.innerHTML = commentsFormHtml;

    const commentsElement = document.getElementById('user-comments');
    commentsElement.style.display = 'block';

    const userNameElement = document.getElementById('user-name');
    userNameElement.value = `${userNameFromApi}`;
    userNameElement.disabled = true;

    sendEventListener();
};