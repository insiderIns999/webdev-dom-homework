"use strict";

import { addComment } from "./api.js";
import { takeAndRender } from "./api.js";
import { renderComments } from "./renderComments.js";
import { getUserCommentDate } from "./functionUserDate.js";
import { editClick } from "./editClick.js";
import { liElClick } from "./liElClick.js";
import { initButtonsLikes } from "./initButtonsLikes.js";
import { authForm } from "./auth.js";
import { userNameFromApi } from "./commentForm.js";

export const userForm = document.getElementById('form');


export const uploadingData = document.getElementById('uploading-data');

export let comments = [];
export const updateComments = newComments => {
  comments = newComments;
}

authForm();

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

      initButtonsLikes();
      renderComments();
      editClick();
      liElClick();
  });

export function sendComment(afterReplaceUserComment) {

  addComment({ name: userNameFromApi, text: afterReplaceUserComment })
  .then((response) => {
    const commentFieldElement = document.getElementById('user-comment');
    const send = document.getElementById('send');
      if (response.status === 400) {
        throw new Error('Имя и/или комментарий короче 3х символов');
      }
      else if (response.status === 500) {
        userForm.style.display = 'none';
        uploadingData.style.display = 'block';
        sendComment();
        commentFieldElement.blur();
        commentFieldElement.value = '';
        send.disabled = true;
      }
      else {
        response.json();
        commentFieldElement.value = '';
        send.disabled = true;
      }
    })
    .then(() => {
      return takeAndRender();
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
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

      const uploadingData = document.getElementById('uploading-data');
      const userForm = document.getElementById('form');
      uploadingData.style.display = 'none';
      userForm.style.display = 'flex';

      renderComments();
      initButtonsLikes();
      liElClick();
      editClick();
    })
    .catch((error) => {
      const uploadingData = document.getElementById('uploading-data');
      const userForm = document.getElementById('form');
      uploadingData.style.display = 'none';
      userForm.style.display = 'flex';
      alert(error);
    });
};