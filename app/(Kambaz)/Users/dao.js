// Users/dao.js
import { v4 as uuidv4 } from "uuid";
import db from "../Database/index.js"; // adjust if your Database index path is different

// assume db.users is the in-memory users array exported from Database
let users = db.users;

const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));



export default function UsersDao() {
  // create a new user and return it
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users = [...users, newUser];
    db.users = users; // keep db in sync if you’re using that pattern
    return newUser;
  };

  // find a user by username
  const findUserByUsername = (username) =>
    users.find((user) => user.username === username);

  // optional helper to inspect data
  const findAllUsers = () => users;

  return {
    createUser,
    findUserByUsername,
    findAllUsers,
  };
}