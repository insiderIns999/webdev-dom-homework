export function sendDisabled({ send, userName, commentFieldElement }) {

    const userNameComment = [userName, commentFieldElement];
  
    for (let i = 0; i < userNameComment.length; i++) {
      userNameComment[i].addEventListener('input', () => {
        if (userNameComment.every((el) => el.value !== '')) {
          return send.disabled = false;
        }
        else {
          return send.disabled = true;
        }
      });
    };
}