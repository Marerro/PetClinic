const { sql } = require("../dbConnection");

exports.postNewAppointment = async (user) => {
  const result = await sql`
  INSERT INTO appointments (petname, petowner, description, date, time, user_id, status)
  VALUES (${user.petname}, ${user.petowner}, ${user.description}, ${user.date}, ${user.time}, ${user.user_id}, ${user.status})
  RETURNING *;
  `;

  return result[0];
};

exports.getAppointments = () => {
  const allAppointments = sql`
    SELECT *
    FROM appointments
    `;
  return allAppointments;
};

exports.filterAppointments = async (id, query, sort, order, isAdmin = false)=> {
  const sortColumns = ["petname", "date", "petowner"];
  const orderColumns = ["ASC", "DESC"];

  const sorted = sortColumns.includes(sort) ? sort : "petname";

  const sortedOrder = orderColumns.includes(order) ? order : "DESC";

    if(isAdmin) {
      const filterAppointmentsByAdmin = await sql`
      SELECT id, petname, petowner, description, date, time, user_id
      FROM appointments
      WHERE petname ILIKE ${query + "%"}
      OR petowner ILIKE ${query + "%"}
      OR description ILIKE ${query + "%"}
      ORDER BY ${sql.unsafe(sorted)} ${sql.unsafe(sortedOrder)}
    `;
    return filterAppointmentsByAdmin
    } else {
      const filterAppointments = await sql`
      SELECT id, petname, petowner, description, date, time, user_id
      FROM appointments
      WHERE (
      petname ILIKE ${query + "%"}
      OR PETOWNER ILIKE ${query + "%"}
      OR description ILIKE ${query + "%"}
      )
      AND user_id = ${id}
      `
      return filterAppointments
    }

};

exports.updateAppointment = async (updatedAppointment, isAdmin = false) => {
  const columns = Object.keys(updatedAppointment);

  let query;

  if (isAdmin) {
    query = sql`
    UPDATE appointments
    SET ${sql(updatedAppointment, ...columns)}
    WHERE id = ${updatedAppointment.id}
    RETURNING *;
      `;
  } else {
    query = sql`
    UPDATE appointments
    SET ${sql(updatedAppointment, ...columns)}
    WHERE id = ${updatedAppointment.id} AND user_id = ${updatedAppointment.user_id}
    RETURNING *;
      `;
  }
  const [appointment] = await query;

  return appointment;
}
exports.deleteAppointment = async (updatedData, isAdmin = false) => {
  if (isAdmin) {
      const appointment = await sql`
      DELETE FROM appointments
      WHERE id = ${updatedData.id}
      RETURNING *;
      `;
      return appointment[0];
  } else {
      const appointment = await sql`
      DELETE FROM appointments
      WHERE id = ${updatedData.id} AND user_id = ${updatedData.user_id}
      RETURNING *;
      `;
      return appointment[0];
  }
};

exports.approveAppointmentById = async (id, status) => {
  const response = await sql`
  UPDATE appointments
  set status = ${status}
  WHERE id = ${id}
  RETURNING *;
  `
  return response[0];
}

