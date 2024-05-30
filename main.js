"use strict";

import { addComment } from "./api.js";
import { takeAndRender } from "./api.js";
import { renderComments } from "./renderComments.js";
import { sendDisabled } from "./sendDisabled.js";
import { getUserCommentDate } from "./functionUserDate.js";

const userName = document.getElementById('user-name');
const commentFieldElement = document.getElementById('user-comment');

const save = document.getElementById('save');
const send = document.getElementById('send');

const userForm = document.getElementById('form');
//const countUsersLikes = 0;

const uploadingData = document.getElementById('uploading-data');


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

const liElClick = () => {
  
  const commentsElements = document.querySelectorAll('.comment');

  commentsElements.forEach((commentElement, index) => {
    commentElement.addEventListener('click', (event) => {
      commentFieldElement.value = 'QUOTE_BEGIN' + comments[index].name + ':\n' + comments[index].comment + 'QUOTE_END ';
    });
  });

}

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

const editClick = () => {
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach((editButton, index) => {
    editButton.addEventListener('click', (event) => {
      event.stopPropagation();

      userName.value = comments[index].name;
      commentFieldElement.value = comments[index].comment;
      send.style.display = 'none';
      save.style.display = 'inline-block';

      save.addEventListener('click', () => {
        alert('Извините данная опция сейчас не доступна.');
        userName.value = '';
        userName.blur();
        commentFieldElement.value = '';
        commentFieldElement.blur();
        send.style.display = 'inline-block';
        save.style.display = 'none';
      });
    });
  });
};

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

function initButtonsLikes() {
  const buttonLikesElements = document.querySelectorAll('.like-button');
  buttonLikesElements.forEach((buttonElement, index) => {
    buttonElement.addEventListener('click', (event) => {

      event.stopPropagation();

      buttonElement.classList.add('-loading-like');
      delay(2000).then(() => {
        comments[index].isLiked
          ? --comments[index].likes
          : ++comments[index].likes;
        comments[index].isLiked = !comments[index].isLiked;
        comments[index].isLikeLoading = false;
        buttonElement.classList.remove('-loading-like');
        
        renderComments();
        initButtonsLikes();
      });

      /*
      if (comments[index].isLiked) {
        comments[index].likes = comments[index].likes - 1;
        comments[index].isLiked = false;
      }
      else {
        comments[index].likes = comments[index].likes + 1;
        comments[index].isLiked = true;
      }
      */
    });
  });
};

//renderComments();

sendDisabled({ send, userName, commentFieldElement });

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

function sendComment(afterReplaceUserName, afterReplaceUserComment) {

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