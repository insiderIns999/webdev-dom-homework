import { comments } from "./main.js";
import { userName } from "./main.js";
import { commentFieldElement } from "./main.js";
import { send } from "./main.js";

export const editClick = () => {
    const editButtons = document.querySelectorAll('.edit-button');
    const save = document.getElementById('save');
    editButtons.forEach((editButton, index) => {
      editButton.addEventListener('click', (event) => {
        event.stopPropagation();
  
        userName.value = comments[index].name;
        commentFieldElement.value = comments[index].comment;
        send.style.display = 'none';
        save.style.display = 'inline-block';
  
        save.addEventListener('click', () => {
          alert('Извините данная опция сейчас не доступна.');
          userName.value = '';
          userName.blur();
          commentFieldElement.value = '';
          commentFieldElement.blur();
          send.style.display = 'inline-block';
          save.style.display = 'none';
          send.disabled = true;
        });
      });
    });
  };