function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve();
        }, interval);
    });
}

export const initButtonsLikes = ({ comments, renderComments }) => {
    const buttonLikesElements = document.querySelectorAll('.like-button');
    buttonLikesElements.forEach((buttonElement, index) => {
        buttonElement.addEventListener('click', (event) => {
        buttonElement.classList.add('-loading-like');
        delay(2000).then(() => {
            comments[index].isLiked
            ? comments[index].likes--
            : comments[index].likes++;
            comments[index].isLiked = !comments[index].isLiked;
            comments[index].isLikeLoading = false;
            buttonElement.classList.remove('-loading-like');
            renderComments({ comments });
        });

        /*
        if (comments[index].isLiked) {
            comments[index].likes = comments[index].likes - 1;
            comments[index].isLiked = false;
        }
        else {
            comments[index].likes = comments[index].likes + 1;
            comments[index].isLiked = true;
        }
        */

        event.stopPropagation();
        });
    });
};