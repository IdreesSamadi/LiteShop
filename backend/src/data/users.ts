import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'John@example.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true
  },
  {
    name: 'Jane Doe',
    email: 'Jane@example.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true
  }
]

export default users
