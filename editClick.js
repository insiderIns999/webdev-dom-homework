import { comments, updateComments } from "./main.js";

export const editClick = () => {
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach((editButton, index) => {
      editButton.addEventListener('click', (event) => {

        const commentFieldElement = document.getElementById('user-comment');
        const save = document.getElementById('save');
        const send = document.getElementById('send');

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