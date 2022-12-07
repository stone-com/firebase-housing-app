import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get auth from firebase
      const auth = getAuth();
      // Register a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Get user info object from response
      const user = userCredential.user;
      console.log(user);
      // Update display name
      updateProfile(auth.currentUser, { displayName: name });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcome! Sign Up Here</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='password'
              id='password'
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              className='showPassword'
              alt='show password'
              onClick={() => setShowPassword((state) => !state)}
            />
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>
          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        {/* Google OAuth will go here. */}

        <Link to='/sign-in' className='registerLink'>
          Already Signed Up? Login
        </Link>
      </main>
    </div>
  );
};
export default SignUp;
