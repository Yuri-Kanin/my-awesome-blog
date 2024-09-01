/* eslint-disable import/no-extraneous-dependencies */
import { Pagination } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import "./Paginator.css";

function Paginator({ currentPage, articlesCount, ChangePage }) {
  const [current, setCurrent] = useState(currentPage);

  const onChange = Value => {
    setCurrent(Value);
    ChangePage(Value);
  };
  return (
    <Pagination
      current={current}
      onChange={onChange}
      align="center"
      total={articlesCount}
      pageSize={5}
      showSizeChanger={false}
      hideOnSinglePage
    />
  );
}

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  articlesCount: PropTypes.number.isRequired,
  ChangePage: PropTypes.func.isRequired,
};

export default Paginator;
