import { commentsElements } from './variables.js';
import { commentFieldElement } from './variables.js';

export const liElClick = ({ comments }) => {

    //commentsElements();
    const commentsElements = document.querySelectorAll('.comment');
    commentFieldElement();

    commentsElements.forEach((commentElement, index) => {
        commentElement.addEventListener('click', (event) => {
            return commentFieldElement = 'QUOTE_BEGIN' + comments[index].name + ':\n' + comments[index].comment + 'QUOTE_END ';
        });
    });
}