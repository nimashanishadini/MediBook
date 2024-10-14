import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatdDoctors from '../components/RelatdDoctors';

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, setAppointments } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docdSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlot([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let startTime = new Date(currentDate);
      startTime.setHours(10, 0, 0, 0);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        startTime = new Date(Math.max(today.getTime(), startTime.getTime()));
      }

      let timeSlots = [];
      startTime.setMinutes(startTime.getMinutes() + 30);
      startTime.setMinutes(0);

      while (startTime < endTime) {
        let formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push({
          datetime: new Date(startTime),
          time: formattedTime
        });
        startTime.setMinutes(startTime.getMinutes() + 30);
      }
      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };

  const handleAppointmentBooking = () => {
    const selectedSlot = docdSlot[slotIndex].find(slot => slot.time === slotTime);
    if (selectedSlot && docInfo) {
      const newAppointment = {
        doctorId: docInfo._id,
        doctorName: docInfo.name,
        date: selectedSlot.datetime.toDateString(),
        time: slotTime,
        fees: docInfo.fees,
      };
      setAppointments(prev => [...prev, newAppointment]); // Store the appointment in context
      navigate('/myappointments'); // Navigate to MyAppointments page
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className="flex-shrink-0">
          <img className="bg-primary w-full rounded-lg sm:max-w-72" src={docInfo.image} alt='' />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px sm:mt-0]'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt='' />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About</p>
            <p className='text-sm text-gray-500 mt-1 max-w-[700px]'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment Fee:
            <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p className='text-2xl'>Booking Slots</p>
        <div className='flex gap-3 items-center w-full  overflow-x-scroll mt-4'>
          {
            docdSlot.length > 0 && docdSlot.map((item, index) => (
              <div onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
                key={index}>
                {item.length > 0 && (
                  <>
                    <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0].datetime.getDate()}</p>
                  </>
                )}
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docdSlot.length && docdSlot[slotIndex].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>
        <button 
              onClick={() => {
                handleAppointmentBooking(); // Call the function to handle booking
                navigate('/myappoinments'); // Then navigate to the MyAppoinments page
              }} 
              className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>
              Book Appointment
            </button>
      </div>
      <RelatdDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointments;
