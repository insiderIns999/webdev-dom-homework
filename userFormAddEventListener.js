import { userName } from './variables.js';
import { commentFieldElement } from './variables.js';
import { send } from './variables.js';
import { userForm } from './variables.js';
import { uploadingData } from './variables.js';

export function userFormAddEventListener({ userForm }) {
  
  userName();
  commentFieldElement();
  uploadingData();
  send();

  userForm.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        if (userName.value.trim() == '' || commentFieldElement.value.trim() == '') {
          alert('Вы не ввели имя и/или комментарий');
          userName.value = '';
          userName.blur();
          commentFieldElement.value = '';
          commentFieldElement.blur();
        }
    
        else {
          userForm.style.display = 'none';
          uploadingData.style.display = 'block';
          sendComment();
          userName.blur();
          userName.value = '';
          commentFieldElement.blur();
          commentFieldElement.value = '';
          send.disabled = true;
        }
      }
  });
}

export function userFormStyles({ response }) {
    if (response.status === 400) {
        throw new Error('Имя и/или комментарий короче 3х символов');
      }
      else if (response.status === 500) {
        userForm.style.display = 'none';
        uploadingData.style.display = 'block';
        sendComment();
        userName.blur();
        commentFieldElement.blur();
        //throw new Error('Упал интернет. Повторите попытку позже.');
      }
      else {
        // Запускаем преобразовываем "сырые" данные от api в json
        // Подписываемся на результат преобразования
        response.json();
        userName.value = '';
        commentFieldElement.value = '';
        send.disabled = true;
    }
}