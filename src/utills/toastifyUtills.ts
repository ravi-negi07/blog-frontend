import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    closeOnClick: true,
    style: {
      backgroundColor: "#4CAF50",
      color: "#fff",
      borderRadius: "5px",
      padding: "10px",
    },
  });
};
export const errorToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    style: {
      backgroundColor: "#f44336",
      color: "#fff",
      borderRadius: "5px",
      padding: "10px",
    },
  });
};
export const infoToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    style: {
      backgroundColor: "#2196F3",
      color: "#fff",
      borderRadius: "5px",
      padding: "10px",
    },
  });
};
