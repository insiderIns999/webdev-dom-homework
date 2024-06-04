import { userForm } from './main.js';
import { userName } from './main.js';
import { commentFieldElement } from './main.js';
import { uploadingData } from './main.js';
import { send } from './main.js';
import { sendComment } from './main.js';

export function userFormStyles() {
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