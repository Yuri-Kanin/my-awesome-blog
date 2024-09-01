/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import classes from "./TagList.module.scss";

function TagList({ AddTag }) {
  const [tagSpace, setTagSpace] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (tagSpace.match(/^(?:[a-z][a-z0-9]*|)$/) && tagSpace.length < 20) {
      setError(false);
    } else {
      setError(true);
    }
  }, [tagSpace]);

  return (
    <>
      <label className={classes.Label}>
        <input
          className={error ? classes.InputErrorTag : classes.InputTag}
          type="text"
          name="tag"
          placeholder="tag"
          value={tagSpace}
          onChange={event => setTagSpace(event.target.value)}
        />
        <button
          className={classes.ButtonTagDelete}
          type="button"
          disabled={error || !tagSpace.length}
          onClick={() => {
            setTagSpace("");
            AddTag(tagSpace);
          }}
        >
          Add Tag
        </button>
      </label>

      {error ? <p className={classes.Error}>Tag is not valid</p> : null}
    </>
  );
}

TagList.propTypes = {
  AddTag: PropTypes.func.isRequired,
};

export default TagList;
