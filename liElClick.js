export const liElClick = ({ comments, commentFieldElement }) => {

    //commentsElements();
    const commentsElements = document.querySelectorAll('.comment');

    commentsElements.forEach((commentElement, index, comments, commentFieldElement) => {
        commentElement.addEventListener('click', (event) => {
            return commentFieldElement = 'QUOTE_BEGIN' + comments[index].name + ':\n' + comments[index].comment + 'QUOTE_END ';
        });
    });
}