const {sql} = require ('../dbConnection');

exports.postNewAppointment = (user) => {
    const newAppointment = sql`
    INSERT INTO appointments (petname, petowner, description, date, time)
    VALUES (${user.petname}, ${user.petowner}, ${user.description}, ${user.date}, ${user.time})
    RETURNING *;
    `
    return newAppointment
} 

exports.getAppointments = () => {
    const allAppointments = sql`
    SELECT *
    FROM appointments
    `
    return allAppointments
}