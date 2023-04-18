function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mt-16 text-center">
          WELCOME TO DAILY GOAL TRACKER
        </h1>
      </div>

      <div>{children}</div>

      <footer className="absolute bottom-1 text-lg mt-12">
        <p>Made with determination and ☕ by Davide Iaiunese</p>
      </footer>
    </div>
  );
}

export default Layout;
