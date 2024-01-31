const Logout = ({ setUser, setIslog }) => {

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIslog(false);

  };

  return (
    <div className="logout" onClick={handleLogout}>
      Logout
    </div>
  );
};

export default Logout;
