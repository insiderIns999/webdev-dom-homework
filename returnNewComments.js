export function returnNewComments() {
    const appCommentsNew = responseData.comments.map((comment) => {

        return {
          name: comment.author.name,
          date: getUserCommentDate(comment.date),
          comment: comment.text,
          likes: comment.likes,
          isLiked: false,
        }
}