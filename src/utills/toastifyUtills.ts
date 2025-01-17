import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastStyle = {
  borderRadius: "5px",
  padding: "10px",
  color: "#fff",
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    closeOnClick: true,
    style: {
      ...toastStyle,
      backgroundColor: "#4CAF50",
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    style: {
      ...toastStyle,
      backgroundColor: "#f44336",
    },
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    style: {
      ...toastStyle,
      backgroundColor: "#2196F3",
    },
  });
};
