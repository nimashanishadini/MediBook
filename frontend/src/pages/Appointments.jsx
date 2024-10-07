import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Assuming you have a context setup for global state
import { assets } from '../assets/assets';

const Appointments = () => {
  const { docId } = useParams();  // Capture the doctor ID from the URL
  const { doctors } = useContext(AppContext); // Assuming you store doctors in context
  const [docInfo, setDocInfo] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null); // Track selected booking slot
  const bookingSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM']; // Example slots

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId); 
    setDocInfo(docInfo);
    console.log(docInfo); // Ensure docInfo is fetched correctly
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot); // Handle slot selection
  };

  if (!docInfo) {
    return <div>Loading...</div>; // Show a loading state until docInfo is available
  }

  return docInfo && (
    <div className="max-w-4xl mx-auto p-6">
      {/* Doctor Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            className="rounded-lg object-cover w-48 h-48"
            src={docInfo.image} // Replace with dynamic src if available
            alt=''
          />
        </div>
       
        <div>
          <p>{docInfo.name} <img src={assets.verified_icon} alt=''/></p>
        </div>







       
      </div>

      {/* Booking Slots */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Booking slots</h3>
        <div className="mt-4 flex gap-4 flex-wrap">
          {["Mon 10", "Tue 11", "Wed 12", "Thu 13", "Fri 14", "Sat 15", "Sun 16"].map(
            (day, index) => (
              <div key={index} className="flex flex-col items-center">
                <button className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg border border-gray-300">
                  {day}
                </button>
                {index === 0 && (
                  <div className="mt-2 flex gap-2">
                    {bookingSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleSlotSelection(slot)}
                        className={`py-2 px-4 text-sm rounded-lg transition ${
                          selectedSlot === slot
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
        <button className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg">
          Book an appointment
        </button>
      </div>

      {/* Related Doctors Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800">Related Doctors</h3>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {["Dr. Richard James", "Dr. Jane Smith", "Dr. John Doe", "Dr. Emily Davis"].map(
            (doctor, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <img
                  className="rounded-lg object-cover w-full h-32 mb-4"
                  src="related-doctor-image.jpg" // Replace with dynamic src if available
                  alt={doctor}
                />
                <h4 className="text-md font-semibold text-gray-900">{doctor}</h4>
                <p className="text-sm text-gray-600">General Physician</p>
                <p className="mt-2 text-sm text-green-600">Available</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
