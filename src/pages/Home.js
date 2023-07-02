const Home = (props) => {
  return (
    <div>
      <h1>Home</h1>
      <a href="/login">
        <h2>Log in</h2>
      </a>
      <a href="/live">
        <h2>Live Page</h2>
      </a>
      <a href="/edit">
        <h2>Edit Page</h2>
      </a>
      <div>
        <h1>Don't have an account?</h1>
        <a href="/demo">
          <h2>Demo Page</h2>
        </a>
      </div>
    </div>
  );
};
export default Home;
