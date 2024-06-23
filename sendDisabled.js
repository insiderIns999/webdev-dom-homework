//import { send } from "./commentForm.js";

export function sendDisabled() {

  const commentFieldElement = document.getElementById('user-comment');
  const send = document.getElementById('send');

  commentFieldElement.addEventListener('input', () => {
    if (commentFieldElement.value !== '') {
      return send.disabled = false;
    }
    else {
      return send.disabled = true;
    }
  });
};

// добавил этот коммент, чтобы обновить данные на своем репозитории