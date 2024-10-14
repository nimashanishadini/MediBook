import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');

    try {
      if (state === 'Sign Up') {
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update user profile with full name
        await updateProfile(userCredential.user, { displayName: name });

        // Store user data in Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          fullName: name,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          uid: userCredential.user.uid,
          createdAt: new Date().toISOString()
        });

        // Navigate to doctors/speciality route after signup
        navigate(`/doctors/general`); // Replace 'general' with the actual speciality if available

        console.log('Account created, profile updated, and user data stored in Firestore');
      } else {
        // Login existing user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', email);
        
        // Fetch user details from Firestore
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('User data:', userData);
          
          // Navigate to doctors/speciality route after login
          const speciality = 'general'; // Replace with actual speciality if available
          navigate(`/doctors/${speciality}`);

        } else {
          console.log('No user data found in Firestore');
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>

        {error && <p className="text-red-500">{error}</p>}

        {state === 'Sign Up' && (
          <>
            <div className='w-full'>
              <p>Full Name</p>
              <input 
                className='border border-zinc-300 rounded w-full p-2 mt-1' 
                type="text" 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                required 
              />
            </div>
            <div className='w-full'>
              <p>Phone Number</p>
              <input 
                className='border border-zinc-300 rounded w-full p-2 mt-1' 
                type="tel" 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                value={phoneNumber} 
                required 
              />
            </div>
            <div className='w-full'>
              <p>Address</p>
              <input 
                className='border border-zinc-300 rounded w-full p-2 mt-1' 
                type="text" 
                onChange={(e) => setAddress(e.target.value)} 
                value={address} 
                required 
              />
            </div>
          </>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <div className='bg-primary text-white w-full py-2 rounded-md text-base text-center'>
          <button type="submit">{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        </div>

        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary cursor-pointer'>Login here</span></p>
          : <p>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-primary cursor-pointer'>Sign up here</span></p>}
      </div>
    </form>
  );
};

export default Login;
