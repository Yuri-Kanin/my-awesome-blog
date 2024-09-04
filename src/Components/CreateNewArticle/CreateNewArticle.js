/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as yup from "yup";
import * as actions from "../../Actions";
import classes from "../CreateNewAccount/CreateNewAccount.module.scss";
import TagList from "../TagList";

const schema = yup
  .object()
  .shape({
    title: yup
      .string()
      .matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/, "You can only use English letter")
      .min(1)
      .max(100)
      .required("This field is required"),
    description: yup
      .string()
      .matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s.!?]+$/, "You can only use letters")
      .min(1)
      .max(109)
      .required("This field is required"),
    body: yup.string().max(4000).required("This field is required"),
  })
  .required();

function CreateNewArticle({
  logInError,
  logInData,
  createNewArticle,
  updateAnArticle,
  fullPost,
  isEditArticle,
}) {
  const uniqueKey = require("unique-key");
  const prevTokenRef = useRef();
  const redirect = useNavigate();
  useEffect(() => {
    prevTokenRef.current = logInError;
  }, []);

  useEffect(() => {
    if (prevTokenRef.current !== logInError || !logInData.token)
      redirect("/sign-in");
  }, [logInError, logInData]);

  const [TagArray, AddTag] = useState([]);
  useEffect(() => {
    if (isEditArticle) AddTag(fullPost[0].tagList);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitFormHandler = data => {
    const info = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: TagArray,
      },
    };

    // eslint-disable-next-line no-unused-expressions
    isEditArticle
      ? updateAnArticle(info, logInData.token, fullPost[0].slug)
      : createNewArticle(info, logInData.token);
  };

  return (
    <div className={classes.Wrapper}>
      <div className={classes.ModalNewArticle}>
        <h2 className={classes.Title}>
          {isEditArticle ? "Edit article" : "Create new article"}
        </h2>
        <form
          className={classes.FormNewArticle}
          onSubmit={handleSubmit(submitFormHandler)}
        >
          <label className={classes.Label}>
            Title
            <input
              className={errors.title ? classes.InputError : classes.Input}
              type="text"
              name="title"
              placeholder="Title"
              {...register("title")}
              defaultValue={isEditArticle ? `${fullPost[0].title}` : null}
            />
            <p className={classes.Error}>{errors.title?.message}</p>
            <p className={classes.Error}>{logInError.title}</p>
          </label>
          <label className={classes.Label}>
            Short description
            <input
              className={
                errors.description ? classes.InputError : classes.Input
              }
              type="text"
              name="description"
              placeholder="Short description"
              {...register("description")}
              defaultValue={isEditArticle ? `${fullPost[0].description}` : null}
            />
            <p className={classes.Error}>{errors.description?.message}</p>
            <p className={classes.Error}>{logInError.description}</p>
          </label>
          <label className={classes.Label}>
            Text
            <textarea
              className={
                errors.text ? classes.InputErrorTextArea : classes.InputTextArea
              }
              type="text"
              name="body"
              placeholder="Text"
              {...register("body")}
              defaultValue={isEditArticle ? `${fullPost[0].body}` : null}
            />
            <p className={classes.Error}>{errors.body?.message}</p>
          </label>
          <ul>
            {TagArray.map(el => (
              <li key={uniqueKey()} className={classes.TagLi}>
                <span className={classes.TagSpan}>{el}</span>
                <button
                  className={classes.ButtonTagDelete}
                  type="button"
                  onClick={() => {
                    const newArr = TagArray.filter(elem => elem !== el);
                    AddTag(newArr);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <TagList
            AddTag={tag => {
              if (!TagArray.includes(tag)) {
                const newArr = [...TagArray, tag];
                AddTag(newArr);
              }
            }}
          />
          <button className={classes.Button} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = ({ logInError, logInData, fullPost }) => ({
  logInError,
  logInData,
  fullPost,
});

const mapDispatchToProps = dispatch => {
  const { createNewArticle, updateAnArticle } = bindActionCreators(
    actions,
    dispatch
  );
  return { createNewArticle, updateAnArticle };
};

CreateNewArticle.propTypes = {
  logInError: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  logInData: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  createNewArticle: PropTypes.func.isRequired,
  isEditArticle: PropTypes.bool.isRequired,
  fullPost: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  updateAnArticle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewArticle);
