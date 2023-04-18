function ErrorLogger(props: { errorMessage: string }) {
  return (
    <div className="errorMessage">
      <h1>{props.errorMessage}</h1>
    </div>
  );
}

export default ErrorLogger;
