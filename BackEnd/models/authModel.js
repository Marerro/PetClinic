const {sql} = require ('../dbConnection');

exports.userRegister = async (user) => {
    const users = await sql`
    INSERT INTO users (name, email, password, roles)
    VALUES (${user.name}, ${user.email}, ${user.password}, ${user.roles || "user"})
    RETURNING *;
    `
    return users[0];
}