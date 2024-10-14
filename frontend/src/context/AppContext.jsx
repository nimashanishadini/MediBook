import { createContext, useState } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [appointments, setAppointments] = useState([]);
    const currencySymbol = "$";

    // Function to remove an appointment by its ID
    const removeAppointment = (appointmentId) => {
        setAppointments((prevAppointments) => 
            prevAppointments.filter((appointment) => appointment.id !== appointmentId)
        );
    };

    const value = {
        doctors,
        currencySymbol,
        appointments, // Add appointments to the context
        setAppointments, // Add setter function for appointments
        removeAppointment, // Add removeAppointment function to the context
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
