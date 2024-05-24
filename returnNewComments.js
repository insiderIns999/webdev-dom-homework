export function returnNewComments({ comments, responseData, getUserCommentDate, uploadingData, userForm, commentsList, buttonLikesElements, initButtonsLikes, commentFieldElement }) {
  
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
    renderComments({ comments, commentsList, initButtonsLikes, buttonLikesElements, commentFieldElement });
}