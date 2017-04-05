import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = props =>
(
  <div className="app-container">
    <header>
      <Link to="/">
        <span> home page link</span>
      </Link>
    </header>
    <div className="app-content">{props.children}</div>
    <footer>
      <p>
          This is footer
          This is a demo app to showcase <strong>universal Javascript</strong>
          with <strong>React</strong> and <strong>Express</strong>.
          </p>
    </footer>
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.string.isRequired,
};
export default Layout;
