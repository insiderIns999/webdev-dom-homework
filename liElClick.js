import { comments } from "./main.js";

export const liElClick = () => {
  
    const commentsElements = document.querySelectorAll('.comment');
  
    commentsElements.forEach((commentElement, index) => {
      commentElement.addEventListener('click', (event) => {
        const commentFieldElement = document.getElementById('user-comment');
        return commentFieldElement.value = 'QUOTE_BEGIN' + comments[index].name + ':\n' + comments[index].comment + 'QUOTE_END ';
      });
    });
  
  }