import { takeAndRender } from "./takeAndRender.js";
import { returnNewComments } from "./returnNewComments.js";
import { renderComments } from "./renderComments.js";

export function sendAddEventListener({ send, userForm, uploadingData, sendComment, userName, commentFieldElement, comments, commentsList, initButtonsLikes, buttonLikesElements, h3, getUserCommentDate }) {

    send.addEventListener('click', () => {
        userForm.style.display = 'none';
        uploadingData.style.display = 'block';
        sendComment();
        userName.blur();
        commentFieldElement.blur();
    })

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
        return returnNewComments({ comments, responseData, getUserCommentDate, uploadingData, userForm, commentsList, buttonLikesElements, initButtonsLikes, commentFieldElement });
    });

    renderComments({ comments, commentsList, buttonLikesElements, initButtonsLikes, commentFieldElement });

}