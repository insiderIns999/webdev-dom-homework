import { updateComments, comments } from "./main.js";

export const renderComments = () => {

    const commentsList = document.getElementById('user-comments');

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
            <button data-id="${comment.id}" class="edit-button">
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

    updateComments(comments);
};