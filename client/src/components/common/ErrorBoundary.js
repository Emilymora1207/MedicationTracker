import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <h1>
          Something went wrong. Please{" "}
          <span onClick={window.location.reload}>Reload.</span>
        </h1>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary