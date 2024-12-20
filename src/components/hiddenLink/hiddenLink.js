import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

const ShowOnLogin = ({ children }) => {
  const {isLoggedIn} = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const {isLoggedIn} = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogin;
