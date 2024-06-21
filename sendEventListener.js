import { sendComment } from "./main.js";
import { userForm } from "./main.js";
import { uploadingData } from "./main.js";
import { send } from "./commentForm.js";

export function sendEventListener() {
  send.addEventListener('click', () => {
      
      const userName = document.getElementById('user-name');
      const commentFieldElement = document.getElementById('user-comment');

      function replaceSymbols(string) {
        return string.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div><br /><br />');
      }
      
      let afterReplaceUserName = replaceSymbols(userName.value);
      let afterReplaceUserComment = replaceSymbols(commentFieldElement.value);
    
      userForm.style.display = 'none';
      uploadingData.style.display = 'block';
      sendComment(afterReplaceUserName, afterReplaceUserComment);
      userName.blur();
      commentFieldElement.blur();
  });
}

// добавил этот коммент, чтобы обновить данные на своем репозитории