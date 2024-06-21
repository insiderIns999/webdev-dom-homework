import { send } from "./commentForm.js";

export function sendDisabled({ commentFieldElement }) {
  if (commentFieldElement.value !== '') {
    return send.disabled = false;
  }
  else {
    return send.disabled = true;
  }
};

// добавил этот коммент, чтобы обновить данные на своем репозитории