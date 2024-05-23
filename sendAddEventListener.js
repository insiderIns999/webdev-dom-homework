export function sendAddEventListener({ send, userForm, uploadingData, sendComment, userName, commentFieldElement }) {

    send.addEventListener('click', () => {
        userForm.style.display = 'none';
        uploadingData.style.display = 'block';
        sendComment();
        userName.blur();
        commentFieldElement.blur();
    });
}