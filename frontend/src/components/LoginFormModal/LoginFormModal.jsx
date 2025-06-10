
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


   let buttonDisabled = false;
  if (credential.length < 4) {
    buttonDisabled = true;
  }
  if (password.length < 6) {
    buttonDisabled = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});


    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        try {
          const data = await res.json();
          if (data) {
            if (data.errors) {
              setErrors(data.errors);
            } else if (data.message) {
              setErrors({ credential: data.message });
            } else {
              setErrors({ credential: "Invalid credentials" });
            }
          }
        } catch (error) {
          setErrors({ credential: "The provided credentials were invalid." });
        }
      });
  };

  return (
    <>
    
    <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={credential}
        onChange={(event) => setCredential(event.target.value)}
        placeholder="Username or Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        required
      />
      {errors.credential && (
        <p className="error-message">{errors.credential}</p>
      )}
        
    
       
        <button
         type="submit"
          disabled={buttonDisabled}
          >
          Log In
          </button>
      </form>
    </>
  );
}

export default LoginFormModal;