import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const MyAppoinments = () => {
  const { appointments, doctors, removeAppointment } = useContext(AppContext);
  const navigate = useNavigate();

  // Function to handle appointment cancellation
  const handleCancelAppointment = (appointmentId) => {
    removeAppointment(appointmentId);
  };

  // Function to handle payment navigation
  const handlePayOnline = (appointmentId) => {
    navigate('/payment', { state: { appointmentId } });
  };

  return (
    <div className='max-w-2xl min-h-[400px] max-h-[600px] overflow-y-auto flex flex-col gap-4 text-sm bg-white p-6 shadow-md rounded-md'>
      <h2 className='text-xl font-semibold'>My Appointments</h2>
      <div>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => {
            const doctor = doctors.find(doc => doc._id === appointment.doctorId);
            return (
              <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                <div className='w-32 bg-indigo-50'>
                  <img src={doctor.image} alt={doctor.name} />
                </div>

                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-neutral-800 font-semibold'>{doctor.name}</p>
                  <p>{doctor.speciality}</p>
                  <p className='text-zinc-700'>Address:</p>
                  <p className='text-xs'>{doctor.address.line1}</p>
                  <p className='text-xs'>{doctor.address.line2}</p>
                  <p className='text-xs mt-1'>
                    <span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>
                    {appointment.date} | {appointment.time}
                  </p>
                </div>

                <div className='flex flex-col gap-2 justify-end'>
                  <button
                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                    onClick={() => handlePayOnline(appointment._id)} // Use appointment._id
                  >
                    Pay Online
                  </button>
                  <button
                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                    onClick={() => handleCancelAppointment(appointment._id)} // Use appointment._id
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No appointments booked yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppoinments;
