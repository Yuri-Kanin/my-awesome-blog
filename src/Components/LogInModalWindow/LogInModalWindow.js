/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as yup from "yup";
import * as actions from "../../Actions";
import classes from "../CreateNewAccount/CreateNewAccount.module.scss";

const schema = yup
  .object()
  .shape({
    email: yup.string().lowercase().strict().email().required(),
    password: yup.string().min(6).max(40).required(),
  })
  .required();

function LogInModalWindow({ logInError, logInData, postAuthData }) {
  const redirect = useNavigate();
  useEffect(() => {
    if (logInData.token) redirect("/");
  }, [logInData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitFormHandler = data => {
    postAuthData(
      {
        user: {
          email: data.email,
          password: data.password,
        },
      },
      "users/login"
    );
  };

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Modal}>
        <h2 className={classes.Title}>SignIn</h2>
        <form
          className={classes.Form}
          onSubmit={handleSubmit(submitFormHandler)}
        >
          <label className={classes.Label}>
            Email Address
            <input
              className={errors.email ? classes.InputError : classes.Input}
              type="email"
              name="email"
              placeholder="Email address"
              {...register("email")}
            />
            <p className={classes.Error}>{errors.email?.message}</p>
            <p className={classes.Error}>
              {logInError["email or password"]
                ? "email or password is invalid"
                : null}
            </p>
          </label>
          <label className={classes.Label}>
            Password
            <input
              className={errors.password ? classes.InputError : classes.Input}
              type="password"
              name="password"
              placeholder="Password"
              {...register("password")}
            />
            <p className={classes.Error}>{errors.password?.message}</p>
          </label>

          <button className={classes.Button} type="submit">
            Login
          </button>
        </form>
        <p className={classes.Text}>
          Do not have an account?{" "}
          <Link className={classes.Link} to="/sign-up">
            Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = ({ logInError, logInData }) => ({
  logInError,
  logInData,
});

const mapDispatchToProps = dispatch => {
  const { postAuthData } = bindActionCreators(actions, dispatch);
  return { postAuthData };
};

LogInModalWindow.propTypes = {
  logInError: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  logInData: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  postAuthData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInModalWindow);
