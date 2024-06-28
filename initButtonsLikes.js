import { comments } from "./main.js";
import { renderComments } from "./renderComments.js";

function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }

export function initButtonsLikes() {
    const buttonLikesElements = document.querySelectorAll('.like-button');
    buttonLikesElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', (event) => {
  
        event.stopPropagation();
        
        if(token === undefined) {
          return alert('Авторизуйтесь, чтобы оставлять комментарий, ставить лайки, редактировать комментарии и отвечать на комментарии');
        }
        else {

          buttonElement.classList.add('-loading-like');
          delay(2000).then(() => {
            comments[index].isLiked
              ? --comments[index].likes
              : ++comments[index].likes;
            comments[index].isLiked = !comments[index].isLiked;
            comments[index].isLikeLoading = false;
            buttonElement.classList.remove('-loading-like');
            
            initButtonsLikes();
            renderComments();
          });
        }
      });
    });
  };