const commentsList = document.getElementById('user-comments');

export function returnComment({ usNameValue, userCommentValue, responseData, getUserCommentDate, comments, userForm }) {
    const appComments = responseData.comments.map((comment) => {

        return {
          name: comment.author.name,
          date: getUserCommentDate(comment.date),
          comment: comment.text,
          likes: comment.likes,
          isLiked: false,
        }
    });
    
    return comments = appComments, renderComments({ usNameValue, userCommentValue, comments, userCommentValue, userForm });
}

import { liElClick } from './liElClick.js';
import { editClick } from './editClick.js';
import { initButtonsLikes } from './initButtonsLikes.js';

export const renderComments = ({ usNameValue, userCommentValue, comments, userForm }) => {
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
  
    return commentsList.innerHTML = commentsHtml, initButtonsLikes({ comments, renderComments }), liElClick({ comments, usNameValue, userCommentValue }), editClick({ usNameValue, userCommentValue, comments, userForm });
  
    //initButtonsLikes({ comments, renderComments });
    //liElClick({ comments, commentFieldElement, userCommentValue });
    //editClick({ userName, comments });
};