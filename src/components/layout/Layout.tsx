import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <p>This is an example header!</p>
      </nav>

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
