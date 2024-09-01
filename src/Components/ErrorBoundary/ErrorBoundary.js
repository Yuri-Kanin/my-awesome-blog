/* eslint-disable react/prop-types */
import { Component } from "react";
import ErrorIndicator from "../ErrorIndicator";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) <ErrorIndicator />;
    return children;
  }
}
