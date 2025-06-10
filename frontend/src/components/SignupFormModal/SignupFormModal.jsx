import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  let buttonDisabled = false;
  if (email.length === 0) {
    buttonDisabled = true;
  }
  if (username.length === 0 || username.length < 4) {
    buttonDisabled = true;
  }
  if (firstName.length === 0) {
    buttonDisabled = true;
  }
  if (lastName.length === 0) {
    buttonDisabled = true;
  }
  if (password.length === 0 || password.length < 6) {
    buttonDisabled = true;
  }
  if (confirmPassword.length === 0) {
    buttonDisabled = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (result) => {
          const data = await result.json();
          if (data && data.errors) {

            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
       
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
       
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
       
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
     
     
      <button type="submit" 
      className="signup-button"
      disabled={buttonDisabled}
      >
        Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;