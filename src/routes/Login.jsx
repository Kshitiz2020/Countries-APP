const Login = () => {
  return (
    <div>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      Not a Member yet? <a href="/register">Register</a>
    </div>
  );
};
export default Login;
