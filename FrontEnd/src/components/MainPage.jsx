import Header from "./Header";
import AddAppointment from "./AddAppointment";
import AppointmentList from "./AppointmentList";
import SearchBar from "./Searchbar";

function MainPage () {
    return (
        <>
        <Header />
        <AddAppointment />
        <SearchBar />
        <AppointmentList />
        </>
    )
}

export default MainPage