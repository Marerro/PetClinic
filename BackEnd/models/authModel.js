const {sql} = require ('../dbConnection');

exports.userRegister = async (user) => {
    const users = await sql`
    INSERT INTO users (email, name, password, roles)
    VALUES (${user.email}, ${user.name}, ${user.password}, ${user.roles || "user"})
    RETURNING *;
    `
    return users[0];
}

exports.getUserByEmail = async (email) => {
    const [user] = await sql`
    SELECT users.*
    FROM users
    WHERE email = ${email};
    `
    return user;
}

exports.getUserById = async (id) => {
    const [user] = await sql`
    SELECT users.*
    FROM users
    WHERE id = ${id};
    `
    return user;
}