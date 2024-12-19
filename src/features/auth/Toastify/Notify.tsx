import { toast } from "react-toastify";

export const notify = (message: string) => {
  toast.success(`${message} - Your data is successfully saved!`);
  toast.error(`${message} - Your data failed to save.`);
};
