import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Edward Vincent',
    image: assets.profile_pic, // Default profile pic
    email: 'edwardvincent@gmail.com',
    phone: '+123456789',
    address: {
      line1: '123 Main St',
      line2: 'Apt 4B',
    },
    gender: 'Male',
    dob: '2000-01-01', // Changed format to YYYY-MM-DD for date input
  });

  const [isEdit, setIsEdit] = useState(false);

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          image: reader.result, // Update the image with the base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to update name and email
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setUserData((prev) => ({
      ...prev,
      name: newName,
      email: `${newName.replace(/\s+/g, '').toLowerCase()}@gmail.com`, // Update email based on name
    }));
  };

  return (
    <div className='max-w-lg flex flex-col gap-4 text-sm bg-white p-6 shadow-md rounded-md'>
      <div className='relative w-36 h-36 m-auto'>
        <img className='w-full h-full rounded-full object-cover' src={userData.image} alt="profile" />
        <label className='absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full text-white cursor-pointer'>
          <FontAwesomeIcon icon={faCamera} />
          <input
            type='file'
            className='hidden'
            accept='image/*'
            onChange={handleImageChange}
          />
        </label>
      </div>

      {isEdit ? (
        <input
          className='bg-gray-50 text-3xl font-medium text-center mt-4 p-2 rounded'
          type='text'
          value={userData.name}
          onChange={handleNameChange} // Update this to call the new function
        />
      ) : (
        <p className='font-medium text-3xl mt-4 text-center text-neutral-800'>{userData.name}</p>
      )}

      <hr className='bg-zinc-400 h-[1px] border-none my-4' />

      <div>
        <p className='text-neutral-500 underline'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id: </p>
          <p className='text-blue-400'>{userData.email}</p>

          <p className='font-medium'>Phone: </p>
          {isEdit ? (
            <input
              className='bg-gray-100 p-2 rounded'
              type='text'
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className='text-blue-400'>{userData.phone}</p>
          )}

          <p className='font-medium'>Address: </p>
          {isEdit ? (
            <div>
              <input
                className='bg-gray-100 p-2 rounded mb-2'
                type='text'
                value={userData.address.line1}
                onChange={(e) => setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))}
              />
              <input
                className='bg-gray-100 p-2 rounded'
                type='text'
                value={userData.address.line2}
                onChange={(e) => setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))}
              />
            </div>
          ) : (
            <p className='text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender: </p>
          {isEdit ? (
            <select
              className='bg-gray-100 p-2 rounded'
              value={userData.gender}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          ) : (
            <p className='text-gray-400'>{userData.gender}</p>
          )}

          <p className='font-medium'>Birthday: </p>
          {isEdit ? (
            <input
              className='bg-gray-100 p-2 rounded'
              type='date'
              value={userData.dob}
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p className='text-gray-400'>{userData.dob}</p>
          )}
        </div>
      </div>

      <div className='mt-10 flex justify-center'>
        {isEdit ? (
          <button
            className='bg-blue-500 text-white px-8 py-2 rounded-full hover:bg-blue-600 transition-all'
            onClick={() => setIsEdit(false)}
          >
            Save Information
          </button>
        ) : (
          <button
            className='bg-blue-500 text-white px-8 py-2 rounded-full hover:bg-blue-600 transition-all'
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
