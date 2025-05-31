import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { FaHome } from 'react-icons/fa';
function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/spots/new" className="create-spot-link">
          Create a New Spot
        </NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
          className="login-button"
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
          className="signup-button"
        />
      </>
    );
  }
  return (
    <div className="navigation-container">

      <div className="nav-left">
        <NavLink to="/" className="logo">
          <FaHome className="logo-icon" />
          <span>Rentrify</span>
        </NavLink>
      </div>

     
      <div className="nav-right">
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;