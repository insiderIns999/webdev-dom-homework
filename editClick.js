import { userName } from './variables.js';
import { commentFieldElement } from './variables.js';
import { send } from './variables.js';
import { userForm } from './variables.js';
import { save } from './variables.js';


function repeatTasks({ i }) {
    
    userName();
    commentFieldElement();
    save();
    send();
    
    comments[i].name = usNameValue;
    comments[i].comment = userCommentValue;
    userName.blur();
    userName.value = '';
    commentFieldElement.blur();
    commentFieldElement.value = '';
    save.style.display = 'none';
    send.style.display = 'inline-block';
    send.disabled = true;
}

export const editClick = ({ comments }) => {
    //editButtons();
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach((editButton, index) => {

        save();

        editButton.addEventListener('click', (event) => {
           
            userName();
            commentFieldElement();
            send();

            userName.value = comments[index].name;
            commentFieldElement.value = comments[index].comment;
            send.style.display = 'none';
            save.style.display = 'inline-block';

            userForm();

            userForm.addEventListener('keyup', (event) => {
                if (event.keyCode === 13) {
                    return repeatTasks({ index, comments});
                }
        });

        save.addEventListener('click', (index) => {
            repeatTasks({ index, comments });
            /*
            comments[index].name = userName.value;
            comments[index].comment = commentFieldElement.value;
            userName.blur();
            userName.value = '';
            commentFieldElement.blur();
            commentFieldElement.value = '';
            save.style.display = 'none';
            send.style.display = 'inline-block';
            send.disabled = true;
            */

            return renderComments({ comments });
        });

        event.stopPropagation();
        });
    });
};