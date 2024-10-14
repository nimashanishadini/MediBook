import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Import auth as well
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to make a payment');
      return;
    }

    try {
      // Add a new document with a generated ID
      await addDoc(collection(db, 'payments'), {
        userId: user.uid,
        userEmail: user.email,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        amount: amount,
        timestamp: new Date()
      });
      alert('Payment information saved successfully!');
      // Reset form fields
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setAmount('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error saving payment information');
    }
  };

  return (
    <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-md'>
      <h2 className='text-xl font-semibold mb-4'>Payment Form</h2>
      <form onSubmit={handlePayment}>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Card Number</label>
          <input
            type='text'
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className='border rounded p-2 w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Expiry Date</label>
          <input
            type='text'
            placeholder='MM/YY'
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className='border rounded p-2 w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>CVV</label>
          <input
            type='text'
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className='border rounded p-2 w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Amount</label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='border rounded p-2 w-full'
            required
          />
        </div>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
          Pay
        </button>
      </form>
    </div>
  );
};

export default Payment;