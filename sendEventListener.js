import { sendComment } from "./main.js";
//import { userForm } from "./main.js";
import { sendDisabled } from "./sendDisabled.js";
//import { send } from "./commentForm.js";
import { userNameFromApi } from "./commentForm.js";

export function sendEventListener() {

  const send = document.getElementById('send');

  sendDisabled();

  send.addEventListener('click', () => {
      
      const commentFieldElement = document.getElementById('user-comment');
      const userForm = document.getElementById('form');
      const uploadingData = document.getElementById('uploading-data');

      function replaceSymbols(string) {
        return string.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div><br /><br />');
      }
      
      let afterReplaceUserComment = replaceSymbols(commentFieldElement.value);
      let afterReplaceUserName = replaceSymbols(userNameFromApi);
    
      userForm.style.display = 'none';
      uploadingData.style.display = 'block';
      sendComment(afterReplaceUserName, afterReplaceUserComment);
      commentFieldElement.blur();
  });
}