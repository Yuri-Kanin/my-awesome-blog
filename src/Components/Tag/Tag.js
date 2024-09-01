/* eslint-disable global-require */
import PropTypes from "prop-types";
import classes from "./Tag.module.scss";

function Tag({ tagList }) {
  const uniqueKey = require("unique-key");

  return tagList
    .filter(el => el && el.length)
    .map(el => (
      <span key={uniqueKey()} className={classes.Tag}>
        {el}
      </span>
    ));
}
Tag.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Tag;
