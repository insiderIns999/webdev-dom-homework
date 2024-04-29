"use strict";
const userName = document.getElementById('user-name');
const commentFieldElement = document.getElementById('user-comment');
const save = document.getElementById('save');
const send = document.getElementById('send');
const commentsList = document.getElementById('user-comments');
const userForm = document.getElementById('form');
const commentsElements = document.querySelectorAll('.comment');
const countUsersLikes = 0;
const userNameComment = [userName, commentFieldElement];


let comments = [];
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



const fetchPromise = fetch('https://wedev-api.sky.pro/api/v1/oleg-gagarin/comments', {
  method: 'GET',
});

fetchPromise.then((response) => {
  const jsonPromise = response.json();

  jsonPromise.then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      
      return {
        name: comment.author.name,
        date: {
          date = new Date(comment.date),
          userDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
          userMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
          userYear = date.getFullYear().toString().substr(-2),
          userHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
          userMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
          return `${userDate}.${userMonth}.${userYear} ${userHours}:${userMinutes}`,
        }
        comment: comment.text,
        countLikes: comment.likes,
        like: false,
      }
    });

    comments = appComments;
    renderComments();
  });
});

function getUserCommentDate() {
  const date = new Date(comment.date);
  const userDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const userMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const userYear = date.getFullYear().toString().substr(-2);
  const userHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const userMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${userDate}.${userMonth}.${userYear} ${userHours}:${userMinutes}`;
}

const liElClick = () => {
  const commentsElements = document.querySelectorAll('.comment');
  commentsElements.forEach((commentElement, index) => {
    commentElement.addEventListener('click', (event) => {
      commentFieldElement.value = 'QUOTE_BEGIN' + comments[index].name + ':\n' + comments[index].comment + 'QUOTE_END ';
    });
  });
}

const editClick = () => {
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach((editButton, index) => {
    editButton.addEventListener('click', (event) => {
      userName.value = comments[index].name;
      commentFieldElement.value = comments[index].comment;
      send.style.display = 'none';
      save.style.display = 'inline-block';

      save.addEventListener('click', () => {
        comments[index].name = userName.value;
        comments[index].comment = commentFieldElement.value;
        userName.blur();
        userName.value = '';
        commentFieldElement.blur();
        commentFieldElement.value = '';
        save.style.display = 'none';
        send.style.display = 'inline-block';
        renderComments();
        initButtonsLikes();
        liElClick();
      });

      event.stopPropagation();
    });
  });
}

const initButtonsLikes = () => {
  const buttonLikesElements = document.querySelectorAll('.like-button');
  buttonLikesElements.forEach((buttonElement, index) => {
    buttonElement.addEventListener('click', (event) => {
      if (comments[index].like) {
        comments[index].countLikes = comments[index].countLikes - 1;
        comments[index].like = false;
      }
      else {
        comments[index].countLikes = comments[index].countLikes + 1;
        comments[index].like = true;
      }
      event.stopPropagation();

      renderComments();
      initButtonsLikes();
      editClick();
      liElClick();
    });
  });
};



const renderComments = () => {
  const commentsHtml = comments.map((comment) => {
    return `
    <li class="comment">
		  <div class="comment-header">
			  <div>${comment.name.replace('<', '&lt;').replace('>', '&gt;')}</div>
			  <div>${comment.date}</div>
		  </div>
		  <div class="comment-body">
			  <div class="comment-text">
			    ${comment.comment.replace('<', '&lt;').replace('>', '&gt;').replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div><br /><br />')}
			  </div>
		  </div>
		  <div class="comment-footer">
        <div class="edit">
          <button class="edit-button">
            <img class="edit-img" src="edit.png" alt="edit" />
          </button>
        </div>
        <div class="likes">
          <span class="likes-counter">${comment.countLikes}</span>
          <button class="like-button ${comment.like ? '-active-like' : ''}"></button>
        </div>
		  </div>
		</li>`;
  }).join('');

  commentsList.innerHTML = commentsHtml;

};

renderComments();
initButtonsLikes();
editClick();
liElClick();

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
    if (userName.value.trim() == '' || commentFieldElement.value.trim() == '') {
      alert('Вы не ввели имя и/или комментарий');
      userName.value = '';
      userName.blur();
      commentFieldElement.value = '';
      commentFieldElement.blur();
    }

    else {
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
  const date = new Date(comment.date);
  const userDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const userMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const userYear = date.getFullYear().toString().substr(-2);
  const userHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const userMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${userDate}.${userMonth}.${userYear} ${userHours}:${userMinutes}`;
}

function sendComment() {
  const oldCommentsList = commentsList.innerHTML;
  comments.push({
    name: userName.value.replace('<', '&lt;').replace('>', '&gt;'),
    date: getUserCommentDate(),
    comment: commentFieldElement.value.replace('<', '&lt;').replace('>', '&gt;'),
    countLikes: countUsersLikes,
    like: initButtonsLikes(),
  });

  renderComments();
  initButtonsLikes();
  editClick();
  liElClick();
}

send.addEventListener('click', () => {
  sendComment();
  send.disabled = true;
  userName.value = '';
  userName.blur();
  commentFieldElement.value = '';
  commentFieldElement.blur();
});