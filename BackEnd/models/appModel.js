const {sql} = require ('../dbConnection');

exports.postNewAppointment = (user) => {
    const newAppointment = sql`
    INSERT INTO appointments (petname, petowner, description, date, time)
    VALUES (${user.petname}, ${user.petowner}, ${user.description}, ${user.date}, ${user.time})
    `
    return newAppointment
} 