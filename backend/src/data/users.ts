import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true
  },
  {
    name: 'Tom Car',
    email: 'tom@test.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: false
  },
  {
    name: 'Jerry Mouse',
    email: 'jerry@test.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: false
  }
]

export default users
