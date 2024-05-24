//import { commentsList } from './variables.js';
import { liElClick } from './liElClick.js';
import { editClick } from './editClick.js';

export function returnComment({ responseData, getUserCommentDate, uploadingData, comments, userForm, commentsList, initButtonsLikes, buttonLikesElements, commentFieldElement }) {

  //commentsList();

  const appComments = responseData.comments.map((comment) => {

        return {
          name: comment.author.name,
          date: getUserCommentDate(comment.date),
          comment: comment.text,
          likes: comment.likes,
          isLiked: false,
        }
  });
    
  comments = appComments;
  
  renderComments({ comments, commentsList, initButtonsLikes, buttonLikesElements, commentFieldElement });

  uploadingData.style.display = 'none';
  userForm.style.display = 'flex';
}

export const renderComments = ({ comments, commentsList, initButtonsLikes, buttonLikesElements, commentFieldElement }) => {

  const commentsHtml = comments.map((comment) => {
    return `
    <li class="comment">
          <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
          </div>
          <div class="comment-body">
              <div class="comment-text">
                ${comment.comment}
              </div>
          </div>
          <div class="comment-footer">
        <div class="edit">
          <button class="edit-button">
            <img class="edit-img" src="edit.png" alt="edit" />
          </button>
        </div>
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
        </div>
          </div>
        </li>`;
  }).join('');

  commentsList.innerHTML = commentsHtml;
  
  initButtonsLikes({ renderComments, buttonLikesElements, comments });
  liElClick({ comments });
  editClick({ comments });

  //initButtonsLikes({ comments, renderComments });
  //liElClick({ comments, commentFieldElement, userCommentValue });
  //editClick({ userName, comments });
};