"use strict";
const userName = document.getElementById('user-name');
const userCommentt = document.getElementById('user-comment');
const send = document.getElementById('send');
const userCommentsList = document.getElementById('user-comments');
const userForm = document.getElementById('form');
const commentsElements = document.querySelectorAll('.comment');
const countUsersLikes = 0;
const userNameComment = [userName, userCommentt];

const userComments = [
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
]

const initButtonsLikes = () => {
  const buttonLikesElements = document.querySelectorAll('.like-button');
  buttonLikesElements.forEach((buttonElement, index) => {
    buttonElement.addEventListener('click', () => {
      if (userComments[index].like) {
        userComments[index].countLikes = userComments[index].countLikes - 1;
        userComments[index].like = false;
      }
      else {
        userComments[index].countLikes = userComments[index].countLikes + 1;
        userComments[index].like = true;
      }
      renderUserComments();
      initButtonsLikes();
    });
  });
};

const renderUserComments = () => {
  const userCommentsHtml = userComments.map((userComment) => {
    return `<li class="comment">
		  <div class="comment-header">
			<div>${userComment.name}</div>
			<div>${userComment.date}</div>
		  </div>
		  <div class="comment-body">
			<div class="comment-text">
			  ${userComment.comment}
			</div>
		  </div>
		  <div class="comment-footer">
			<div class="likes">
			  <span class="likes-counter">${userComment.countLikes}</span>
			  <button class="like-button ${userComment.like ? '-active-like' : ''}"></button>
			</div>
		  </div>
		  </li>`;
  }).join('');

  userCommentsList.innerHTML = userCommentsHtml;

};
renderUserComments();
initButtonsLikes();


let check;

for (let i = 0; i < userNameComment.length; i++) {
  userNameComment[i].addEventListener('input', () => {
    if (userNameComment.every((el) => el.value !== '')) {
      send.disabled = false;
    }
    else {
      send.disabled = true;
    }
  });
}

userForm.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    if (userName.value.trim() == '' || userCommentt.value.trim() == '') {
      alert('Вы не ввели имя и/или комментарий');
      userName.value = '';
      userName.blur();
      userCommentt.value = '';
      userCommentt.blur();
    }

    else {
      sendComment();
      userName.blur();
      userName.value = '';
      userCommentt.blur();
      userCommentt.value = '';
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
  const oldUserCommentsList = userCommentsList.innerHTML;
  getUserCommentDate();
  userComments.push({
    name: userName.value,
    date: getUserCommentDate(),
    comment: userCommentt.value,
    countLikes: countUsersLikes,
    like: initButtonsLikes(),
  });

  renderUserComments();
  initButtonsLikes();
}

send.addEventListener('click', () => {
  sendComment();
  send.disabled = true;
  userName.value = '';
  userName.blur();
  userCommentt.value = '';
  userCommentt.blur();
});

//-------------------------LIKES----------------------------

console.log("It works!!!");