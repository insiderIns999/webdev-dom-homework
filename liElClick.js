import { comments } from "./main.js";
import { token } from "./api.js";

export const liElClick = () => {
  
    const commentsElements = document.querySelectorAll('.comment');
  
    commentsElements.forEach((commentElement, index) => {
      commentElement.addEventListener('click', (event) => {
        if(token === undefined) {
          return alert('Авторизуйтесь, чтобы оставлять комментарий, ставить лайки, редактировать комментарии и отвечать на комментарии');
        }
        else {
          const commentFieldElement = document.getElementById('user-comment');
          return commentFieldElement.value = 'QUOTE_BEGIN' + comments[index].name + ':\n' + comments[index].comment + 'QUOTE_END ';
        }
      });
    });
  
  }