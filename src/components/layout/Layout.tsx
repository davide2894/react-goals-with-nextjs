import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen layout">
      <div>
        <h1 className="text-2xl font-bold mt-16 text-center">
          WELCOME TO DAILY GOAL TRACKER
        </h1>
      </div>

      <div>{children}</div>

      <footer className="text-lg mt-auto">
        <p>Made with determination and ☕ by Davide Iaiunese</p>
      </footer>
    </div>
  );
}

export default Layout;
