import { format } from "date-fns";

export function getUserCommentDate() {
  const date = new Date();
  const userDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const userMonth =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const userYear = date.getFullYear().toString().substr(-2);
  const userHours =
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const userMinutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const getUserCommentDate = `${userDate}.${userMonth}.${userYear} ${userHours}:${userMinutes}`;
  return format(getUserCommentDate, 'yyyy-MM-dd hh.mm.ss');
}
