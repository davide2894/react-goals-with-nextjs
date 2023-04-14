import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="home__welcomeMessage">
        <h1>WELCOME TO DAILY GOAL TRACKER</h1>
      </div>

      <div>
        <main>{children}</main>
      </div>

      <footer>
        <p>This is an example footer!</p>
      </footer>
    </div>
  );
}

export default Layout;
