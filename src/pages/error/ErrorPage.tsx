import LinkButton from "../../components/button/LinkButton";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="not__found">
      <div className="not__found__content">
        <h1 className="not__found__error__code">404</h1>
        <p className="not__found__message">
          Oops! Looks like you&apos;ve hit a dead end.
        </p>
        <p className="not__found__suggestion">
          We can&apos;t find the page you&apos;re looking for.
        </p>
        <LinkButton
          className="not__found__link"
          onClickLink="/"
          referrerPolicy="same-origin"
          text="Home"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
