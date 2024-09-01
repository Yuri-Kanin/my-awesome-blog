import { Link } from "react-router-dom";
import classes from "../Header/Header.module.scss";

function HeaderStartInfo() {
  return (
    <>
      <button className={classes.Header_Button} type="button">
        <span>
          <Link to="/sign-in">Sign In</Link>
        </span>
      </button>
      <button className={classes.Header_Button_SignUp} type="button">
        <span>
          <Link to="/sign-up">Sign Up</Link>
        </span>
      </button>
    </>
  );
}

export default HeaderStartInfo;
