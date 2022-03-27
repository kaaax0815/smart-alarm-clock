import React from 'react';
import { Link } from 'react-router-dom';

type State = {
  hasError: boolean;
};

type Props = unknown;

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <br />
          <Link to={'/'}>Go Home</Link>
        </>
      );
    }

    return this.props.children;
  }
}
