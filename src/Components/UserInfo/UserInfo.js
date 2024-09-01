import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "../../Actions";
import classes from "../Header/Header.module.scss";

function UserInfo({ logInData, forceUpdateLogInData }) {
  return (
    <>
      <button className={classes.Header_Button_Create} type="button">
        <Link to="/new-article">
          <span>Create Article</span>
        </Link>
      </button>
      <button type="button" className={classes.Photo}>
        <Link to="/profile">
          <span className={classes.Username}>{logInData.username}</span>
          <img className={classes.Image} src={logInData.image} alt="ava" />
        </Link>
      </button>
      <button
        className={classes.Header_Button_LogOut}
        type="button"
        onClick={() => {
          localStorage.clear();
          forceUpdateLogInData({});
        }}
      >
        <span>LogOut</span>
      </button>
    </>
  );
}

const mapStateToProps = ({ logInData }) => ({
  logInData,
});

const mapDispatchToProps = dispatch => {
  const { forceUpdateLogInData } = bindActionCreators(actions, dispatch);
  return { forceUpdateLogInData };
};

UserInfo.propTypes = {
  logInData: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  forceUpdateLogInData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
