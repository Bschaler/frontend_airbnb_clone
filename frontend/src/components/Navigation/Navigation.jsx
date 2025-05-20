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
      <li className="nav-item">
      <NavLink to="/spots/new">Create a New Spot</NavLink>
    </li>
      <li className="nav-item">
        <ProfileButton user={sessionUser} />
      </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li className="nav-item">
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
             className="login-button"
          />
        </li>
       
        <li className="nav-item">
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
            className="signup-button"
          />
        
        </li>
      </>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #ccc'
    }}>
      <div>
        <NavLink to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none', 
          color: 'black', 
          fontWeight: 'bold' 
        }}>
          <FaHome style={{ color: '#ff385c', marginRight: '5px' }} />
          <span>Rentrify</span>
        </NavLink>
      </div>
      <div style={{ display: 'flex' }}>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;