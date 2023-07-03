import React, { useContext } from 'react';
import { AuthContext } from '../../Store/Context';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
function Header() {
  const { user, setUser } = useContext(AuthContext)
  const logout = () => {
    const auth = getAuth()
    try {
      signOut(auth)
      setUser(null)
    } catch (error) {
      console.log("Error signing out:", error);
    }
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <span className="loginText">Welcome {user.displayName}</span>
          ) : (
            <Link to="/login" className="loginText">Login</Link>
          )}
        </div>
        {user && (
          <span className="logout" onClick={logout}>
            Logout
          </span>
        )}

       <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span><Link to='/create'>Create</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
