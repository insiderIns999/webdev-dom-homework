export const liElClick = ({ comments, userCommentValue }) => {
    const commentsElements = document.querySelectorAll('.comment');
    commentsElements.forEach((commentElement, index) => {
        commentElement.addEventListener('click', (event) => {
            return userCommentValue = 'QUOTE_BEGIN' + comments[index].name + ':\n' + comments[index].comment + 'QUOTE_END ';
        });
    });
}