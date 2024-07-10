export function sendDisabled() {

  const commentFieldElement = document.getElementById('user-comment');
  const send = document.getElementById('send');

  commentFieldElement.addEventListener('input', () => {
    if (commentFieldElement.value !== '') {
      return send.disabled = false;
    }
    else {
      return send.disabled = true;
    }
  });
};