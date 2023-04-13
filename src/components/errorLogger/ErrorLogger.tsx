//  @TODO tailwind -> import "./ErrorLogger.scss";

function ErrorLogger({ errorMessage }) {
  return (
    <div className="errorMessage">
      <h1>{errorMessage}</h1>
    </div>
  );
}

export default ErrorLogger;
