import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="home__welcomeMessage">
        <h1 className="text-2xl font-bold mt-16 mb-16 text-center">
          WELCOME TO DAILY GOAL TRACKER
        </h1>
      </div>

      <div>{children}</div>

      <footer className="absolute bottom-3 text-lg">
        <p>Made with determination and ☕ by Davide Iaiunese</p>
      </footer>
    </div>
  );
}

export default Layout;
