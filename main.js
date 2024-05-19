"use strict";

import { takeAndRender } from './takeAndRender.js';
//import { liElClick } from './liElClick.js';
//import { editClick } from './editClick.js';
//import { initButtonsLikes } from './initButtonsLikes.js';
import { renderComments } from './renderComments.js';
import { returnComment } from './renderComments.js';
//import { returnNewComments } from './returnNewComments.js';

const userName = document.getElementById('user-name');
const commentFieldElement = document.getElementById('user-comment');
const send = document.getElementById('send');
const userForm = document.getElementById('form');
//const commentsElements = document.querySelectorAll('.comment');
//const countUsersLikes = 0;
const userNameComment = [userName, commentFieldElement];
const uploadingData = document.getElementById('uploading-data');
const h3 = document.getElementById('befor-loading-comments');
const userCommentValue = document.getElementById('user-comment').value;
const usNameValue = document.getElementById('user-name').value;

let comments = [];

//h3.style.display = 'block';

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
    if (response.status === 500) {
      throw new Error('Извините, что-то пошло не так. Повторите попытку позже.');
    }
    else {
      h3.style.display = 'none';
      return response.json();
    }
  })
  .then((responseData) => {
    returnComment({ responseData, getUserCommentDate, comments, userForm, userCommentValue, usNameValue });
  });

renderComments({ userCommentValue, usNameValue, comments, userForm });

for (let i = 0; i < userNameComment.length; i++) {
  userNameComment[i].addEventListener('input', () => {
    if (userNameComment.every((el) => el.value !== '')) {
      send.disabled = false;
    }
    else {
      send.disabled = true;
    }
  });
};

userForm.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    if (userName.value.trim() == '' || commentFieldElement.value.trim() == '') {
      alert('Вы не ввели имя и/или комментарий');
      userName.value = '';
      userName.blur();
      commentFieldElement.value = '';
      commentFieldElement.blur();
    }

    else {
      userForm.style.display = 'none';
      uploadingData.style.display = 'block';
      sendComment();
      userName.blur();
      userName.value = '';
      commentFieldElement.blur();
      commentFieldElement.value = '';
      send.disabled = true;
    }
  }
});

function getUserCommentDate() {
  const date = new Date();
  const userDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const userMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const userYear = date.getFullYear().toString().substr(-2);
  const userHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const userMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${userDate}.${userMonth}.${userYear} ${userHours}:${userMinutes}`;
}

function sendComment() {

  function replaceSymbols(string) {
    return string.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div><br /><br />');
  }

  let afterReplaceUserName = replaceSymbols(userName.value);
  let afterReplaceUserComment = replaceSymbols(commentFieldElement.value);
  const addComment = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/oleg-gagarin/comments', {
      method: 'POST',
      body: JSON.stringify({
        'name': afterReplaceUserName,
        'text': afterReplaceUserComment,
        forceError: true
      }),
    });
  };

  addComment()
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
    .then((responseData) => {

      // Получили данные и рендерим их в приложении
      return takeAndRender({ responseData });
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
      //returnNewComments({ responseData, getUserCommentDate })
      returnComment({ responseData, getUserCommentDate, comments });

      //comments = appCommentsNew;

      //renderComments();
      //initButtonsLikes();
      //liElClick();
      //editClick();

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

send.addEventListener('click', () => {
  userForm.style.display = 'none';
  uploadingData.style.display = 'block';
  sendComment();
  userName.blur();
  commentFieldElement.blur();
});