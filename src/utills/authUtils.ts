import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role?: string;
}

export const getRole = (): string => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const userRole = decodedToken?.role || "reader";
      return userRole;
    } catch (error) {
      return "reader";
    }
  } else {
    return "reader";
  }
};
