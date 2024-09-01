import PropTypes from "prop-types";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HeaderStartInfo from "../HeaderStartInfo";
import UserInfo from "../UserInfo/UserInfo";
import classes from "./Header.module.scss";

function Header({ logInData }) {
  useEffect(() => {}, [logInData]);

  return (
    <header className={classes.Header}>
      <h1 className={classes.Header_Title}>
        <Link to="/articles">Realworld Blog</Link>
      </h1>
      {logInData.token ? <UserInfo /> : <HeaderStartInfo />}
    </header>
  );
}

Header.propTypes = {
  logInData: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

const mapStateToProps = ({ logInData }) => ({
  logInData,
});

export default connect(mapStateToProps)(Header);
