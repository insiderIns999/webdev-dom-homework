export function returnNewComments({ responseData, comments, commentsList }) {
  
    const appCommentsNew = responseData.comments.map((comment) => {

        return {
          name: comment.author.name,
          date: getUserCommentDate(comment.date),
          comment: comment.text,
          likes: comment.likes,
          isLiked: false,
        }

        comments = appCommentsNew;
    });
}