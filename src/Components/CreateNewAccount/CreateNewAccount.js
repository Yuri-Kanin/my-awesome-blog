/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as yup from "yup";
import * as actions from "../../Actions";
import classes from "./CreateNewAccount.module.scss";

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .matches(/^[a-z][a-z0-9]*$/, "You can only use English letter")
      .min(3)
      .max(20)
      .required(),
    email: yup.string().lowercase().strict().email().required(),
    password: yup.string().min(6).max(40).required(),
    repeatPassword: yup.string().oneOf([yup.ref("password"), null]),
  })
  .required();

function CreateNewAccount({ logInError, postAuthData }) {
  const [state, setState] = useState({
    agree: false,
    submitDisabled: false,
  });
  const { agree, submitDisabled } = state;

  useEffect(() => {
    const newState = { ...state };
    setState({ ...newState, submitDisabled: !state.agree });
  }, [agree]);

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
          username: data.username,
          email: data.email,
          password: data.password,
        },
      },
      "users"
    );
  };

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Modal}>
        <h2 className={classes.Title}>Create new account</h2>
        <form
          className={classes.Form}
          onSubmit={handleSubmit(submitFormHandler)}
        >
          <label className={classes.Label}>
            Username
            <input
              className={errors.username ? classes.InputError : classes.Input}
              type="text"
              name="username"
              placeholder="Username"
              {...register("username")}
            />
            <p className={classes.Error}>{errors.username?.message}</p>
            <p className={classes.Error}>{logInError.username}</p>
          </label>
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
            <p className={classes.Error}>{logInError.email}</p>
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
          <label className={classes.Label}>
            Repeat Password
            <input
              className={
                errors.repeatPassword ? classes.InputError : classes.Input
              }
              type="password"
              name="repeatPassword"
              placeholder="Password"
              {...register("repeatPassword")}
            />
            <p className={classes.Error}>
              {errors.repeatPassword && "Passwords must match"}
            </p>
          </label>
          <label className={classes.LabelCheck}>
            <input
              type="checkbox"
              checked={agree}
              onChange={event => {
                const newState = { ...state };
                setState({ ...newState, agree: event.target.checked });
              }}
            />
            I agree to the processing of my personal information
          </label>
          <button
            className={classes.Button}
            type="submit"
            disabled={submitDisabled}
          >
            Create
          </button>
        </form>
        <p className={classes.Text}>
          Already have an account?{" "}
          <Link className={classes.Link} to="/sign-in">
            Sign in.
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

CreateNewAccount.propTypes = {
  logInError: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  logInData: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  postAuthData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewAccount);
