"use strict";

import { addComment } from "./api.js";
import { takeAndRender } from "./api.js";
import { renderComments } from "./renderComments.js";
import { sendDisabled } from "./sendDisabled.js";
import { getUserCommentDate } from "./functionUserDate.js";
import { editClick } from "./editClick.js";
import { liElClick } from "./liElClick.js";
import { initButtonsLikes } from "./initButtonsLikes.js";
import { sendEventListener } from "./sendEventListener.js";

export const userName = document.getElementById('user-name');
export const commentFieldElement = document.getElementById('user-comment');

export const send = document.getElementById('send');

export const userForm = document.getElementById('form');
//const countUsersLikes = 0;

export const uploadingData = document.getElementById('uploading-data');

//h3.style.display = 'block';

export let comments = [];
export const updateComments = newComments => {
  comments = newComments;
}
/*
{
  name: 'Глеб Фокин',
  date: getUserCommentDate(),
  comment: 'Это будет первый комментарий на этой странице',
  countLikes: 3,
  like: false,
},
{
  name: 'Варвара Н.',
  date: getUserCommentDate(),
  comment: 'Мне нравится как оформлена эта страница! ❤',
  countLikes: 75,
  like: true,
},
];
*/

takeAndRender()
  .then((response) => {

      const h3 = document.getElementById('befor-loading-comments');

      if (response.status === 500) {
          throw new Error('Извините, что-то пошло не так. Повторите попытку позже.');
      }
      else {
          h3.style.display = 'none';
          return response.json();
      }
  })
  .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        getUserCommentDate();
        return {
            name: comment.author.name,
            date: getUserCommentDate(comment.date),
            comment: comment.text,
            likes: comment.likes,
            isLiked: false,
        }
      });
  
      comments = appComments;

      renderComments();
      initButtonsLikes();
      editClick();
      liElClick();
  });

/*
function repeatTasks(i) {
  comments[i].name = userName.value;
  comments[i].comment = commentFieldElement.value;
  userName.blur();
  userName.value = '';
  commentFieldElement.blur();
  commentFieldElement.value = '';
  save.style.display = 'none';
  send.style.display = 'inline-block';
  send.disabled = true;
}
*/

//renderComments();

sendDisabled({ send, userName, commentFieldElement });

export function sendComment(afterReplaceUserName, afterReplaceUserComment) {

  addComment({ name: afterReplaceUserName, text: afterReplaceUserComment })
  .then((response) => {
      if (response.status === 400) {
        throw new Error('Имя и/или комментарий короче 3х символов');
      }
      else if (response.status === 500) {
        userForm.style.display = 'none';
        uploadingData.style.display = 'block';
        sendComment();
        userName.blur();
        commentFieldElement.blur();
        userName.value = '';
        commentFieldElement.value = '';
        send.disabled = true;
        //throw new Error('Упал интернет. Повторите попытку позже.');
      }
      else {
        // Запускаем преобразовываем "сырые" данные от api в json
        // Подписываемся на результат преобразования
        response.json();
        userName.value = '';
        commentFieldElement.value = '';
        send.disabled = true;
      }
    })
    .then(() => {

      // Получили данные и рендерим их в приложении
      return takeAndRender();
      /*
      comments = responseData.comments;
      
      renderComments();
      initButtonsLikes();
      editClick();
      liElClick();
      */
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      const appCommentsNew = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: getUserCommentDate(comment.date),
          comment: comment.text,
          likes: comment.likes,
          isLiked: false,
        }
      });

      comments = appCommentsNew;

      renderComments();
      initButtonsLikes();
      liElClick();
      editClick();

      uploadingData.style.display = 'none';
      userForm.style.display = 'flex';
    })
    .catch((error) => {
      uploadingData.style.display = 'none';
      userForm.style.display = 'flex';
      alert(error);
    });

  /*
  //const oldCommentsList = commentsList.innerHTML;
  comments.push({

    //name: userName.value.replace('<', '&lt;').replace('>', '&gt;'),
    date: getUserCommentDate(),
    //comment: commentFieldElement.value.replace('<', '&lt;').replace('>', '&gt;'),
    likes: countUsersLikes,
    isLiked: initButtonsLikes(),

  });

  renderComments();
  initButtonsLikes();
  editClick();
  liElClick();
  */
};

sendEventListener();