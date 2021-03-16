import React from "react";
import PropTypes from "prop-types";
import s from "./Button.module.css";

const Button = ({ children, onClick, ...allProps }) => (
  <div className={s.buttonWrapper}>
    <button type="button" className={s.button} onClick={onClick} {...allProps}>
      Load More {children}
    </button>
  </div>
);

Button.defaultProps = {
  onClick: () => null,
  children: null,
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  "aria-label": PropTypes.string.isRequired,
};

export default Button;
