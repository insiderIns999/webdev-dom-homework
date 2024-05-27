"use strict";

import { takeAndRender } from './takeAndRender.js';
//import { liElClick } from './liElClick.js';
//import { editClick } from './editClick.js';
//import { initButtonsLikes } from './initButtonsLikes.js';
import { renderComments } from './renderComments.js';
import { returnComment } from './renderComments.js';
import { returnNewComments } from './returnNewComments.js';
import { userFormAddEventListener } from './userFormAddEventListener.js';
import { sendAddEventListener } from './sendAddEventListener.js';
//import { send } from './variables.js';
//import { h3 } from './variables.js';
//import { userForm } from './variables.js';
//import { userName } from './variables.js';
//import { commentFieldElement } from './variables.js';
import { userFormStyles } from './userFormAddEventListener.js';
import { initButtonsLikes } from './initButtonsLikes.js';

//const commentsElements = document.querySelectorAll('.comment');
//const countUsersLikes = 0;
const userName = document.getElementById('user-name');
const commentFieldElement = document.getElementById('user-comment');
const userNameComment = [userName, commentFieldElement];
const userForm = document.getElementById('form');
const send = document.getElementById('send');
const h3 = document.getElementById('befor-loading-comments');
const uploadingData = document.getElementById('uploading-data');
const commentsList = document.getElementById('user-comments');

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
    returnComment({ comments, responseData, getUserCommentDate, uploadingData, userForm, commentsList, initButtonsLikes, commentFieldElement });
  });

renderComments({ comments, commentsList, initButtonsLikes, commentFieldElement });

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

userFormAddEventListener({ userForm });

function getUserCommentDate() {
  const date = new Date();
  const userDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const userMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const userYear = date.getFullYear().toString().substr(-2);
  const userHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const userMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${userDate}.${userMonth}.${userYear} ${userHours}:${userMinutes}`;
}

function sendComment(/*userName, commentFieldElement, uploadingData, userForm*/ ) {

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
      return userFormStyles(response);
    })
    .then((responseData) => {

      // Получили данные и рендерим их в приложении
      return takeAndRender({ /*responseData*/ });
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
      return returnNewComments({ comments, responseData, getUserCommentDate, uploadingData, userForm, commentsList, initButtonsLikes, commentFieldElement });
      //returnComment({ responseData, getUserCommentDate, uploadingData, comments, initButtonsLikes, commentFieldElement });

      //comments = appCommentsNew;

      //renderComments();
      //initButtonsLikes();
      //liElClick();
      //editClick();
    })
    .then((response) => {
      return userFormStyles({ response });
    })
    //.then((responseData) => {
    //  returnNewComments({ responseData, comments, renderComments });
    //})
    .catch((/*error*/) => {
      uploadingData.style.display = 'none';
      userForm.style.display = 'flex';
      //alert(error);
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

sendAddEventListener({ send, userForm, uploadingData, sendComment, userName, commentFieldElement, renderComments, comments, commentsList, initButtonsLikes, h3, getUserCommentDate });