import { comments } from "./main.js";
import { commentFieldElement } from "./commentForm.js";
import { send } from "./commentForm.js";

export const editClick = () => {
    const editButtons = document.querySelectorAll('.edit-button');
    const save = document.getElementById('save');
    editButtons.forEach((editButton, index) => {
      editButton.addEventListener('click', (event) => {
        event.stopPropagation();
        commentFieldElement.value = comments[index].comment;
        send.style.display = 'none';
        save.style.display = 'inline-block';
  
        save.addEventListener('click', () => {
          alert('Извините данная опция сейчас не доступна.');
          commentFieldElement.value = '';
          commentFieldElement.blur();
          send.style.display = 'inline-block';
          save.style.display = 'none';
          send.disabled = true;
        });
      });
    });
  };