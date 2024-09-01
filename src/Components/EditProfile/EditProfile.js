/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as yup from "yup";
import * as actions from "../../Actions";
import classes from "../CreateNewAccount/CreateNewAccount.module.scss";

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .matches(/^[a-z][a-z0-9]*$/)
      .min(3)
      .max(20)
      .required(),
    email: yup.string().lowercase().strict().email().required(),
    password: yup.string().min(6).max(40).required(),
    avatar: yup.string().url().strict(),
  })
  .required();

function EditProfile({ logInError, logInData, putEditProfile }) {
  const prevTokenRef = useRef();
  const redirect = useNavigate();
  useEffect(() => {
    prevTokenRef.current = logInData.token;
  }, []);

  useEffect(() => {
    if (prevTokenRef.current !== logInData.token || !logInData.token)
      redirect("/");
  }, [logInData, logInData.token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitFormHandler = data => {
    putEditProfile(
      {
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
          image: data.avatar,
        },
      },
      logInData.token
    );
  };

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Modal}>
        <h2 className={classes.Title}>Edit Profile</h2>
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
              type="text"
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
            New password
            <input
              className={errors.password ? classes.InputError : classes.Input}
              type="text"
              name="password"
              placeholder="Password"
              {...register("password")}
            />
            <p className={classes.Error}>{errors.password?.message}</p>
          </label>
          <label className={classes.Label}>
            Avatar image (url)
            <input
              className={errors.password ? classes.InputError : classes.Input}
              type="text"
              name="avatar"
              placeholder="Avatar image"
              {...register("avatar")}
            />
            <p className={classes.Error}>{errors.avatar?.message}</p>
          </label>

          <button className={classes.Button} type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = ({ logInError, logInData }) => ({
  logInError,
  logInData,
});

const mapDispatchToProps = dispatch => {
  const { putEditProfile } = bindActionCreators(actions, dispatch);
  return { putEditProfile };
};

EditProfile.propTypes = {
  logInError: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  logInData: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  putEditProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
