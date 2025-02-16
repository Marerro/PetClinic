const { sql } = require("../dbConnection");

exports.postNewAppointment = async (user) => {
  const result = await sql`
  INSERT INTO appointments (petname, petowner, description, date, time, user_id)
  VALUES (${user.petname}, ${user.petowner}, ${user.description}, ${user.date}, ${user.time}, ${user.user_id})
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

exports.filterAppointments = (query, sort, order) => {
  const sortColumns = ["petname", "date", "petowner"];
  const orderColumns = ["ASC", "DESC"];

  const sorted = sortColumns.includes(sort) ? sort : "petname";

  const sortedOrder = orderColumns.includes(order) ? order : "DESC";

  const filterAppointments = sql`
    SELECT id, petname, petowner, description, date, time
    FROM appointments
    WHERE petname ILIKE ${query + "%"}
      OR petowner ILIKE ${query + "%"}
      OR description ILIKE ${query + "%"}
    ORDER BY ${sql.unsafe(sorted)} ${sql.unsafe(sortedOrder)}
  `;
  return filterAppointments;
};

exports.updateAppointment = async (updatedAppointment, isAdmin = false) => {
  const columns = Object.keys(updatedAppointment)

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
};


