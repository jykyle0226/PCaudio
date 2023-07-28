const Home = (props) => {
  return (
    <div>
      <h1>WELCOME!</h1>
      <h2>Please Log In!</h2>
      <a href="/login">
        <h2>Log in</h2>
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
