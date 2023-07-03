const express = require('express')
const {
  getAllUsers,
  createUser,
  createExercise,
  getUserLog,
} = require('../controllers/users.js')

const userRouter = express.Router()

userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:_id/exercises').post(createExercise)
userRouter.route('/:_id/logs').get(getUserLog)

module.exports = userRouter
