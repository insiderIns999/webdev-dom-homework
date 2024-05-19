const save = document.getElementById('save');


function repeatTasks({ i, usNameValue, comments, userCommentValue }) {
    comments[i].name = usNameValue;
    comments[i].comment = userCommentValue;
    userName.blur();
    usNameValue = '';
    commentFieldElement.blur();
    userCommentValue = '';
    save.style.display = 'none';
    send.style.display = 'inline-block';
    send.disabled = true;
}

export const editClick = ({ usNameValue, userCommentValue, userForm, comments }) => {
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((editButton, index) => {
        editButton.addEventListener('click', (event) => {
        usNameValue = comments[index].name;
        userCommentValue = comments[index].comment;
        send.style.display = 'none';
        save.style.display = 'inline-block';

        userForm.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                return repeatTasks({ index, usNameValue, comments, userCommentValue });
            }
        });

        save.addEventListener('click', (index) => {
            repeatTasks({ index, usNameValue, comments, userCommentValue });
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

            return renderComments({ usNameValue, userCommentValue, comments, userForm });
        });

        event.stopPropagation();
        });
    });
};