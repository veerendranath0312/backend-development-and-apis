const User = require('../models/users.js')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('username')
    res.json(users)
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

const createUser = async (req, res) => {
  try {
    const { username } = req.body

    const newUser = new User({ username })
    const createdUser = await newUser.save()

    res.json({ username: createdUser.username, _id: createdUser._id })
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

const createExercise = async (req, res) => {
  try {
    const { _id } = req.params
    const data = req.body

    const exerciseDetails = {
      ...data,
      date: data.date
        ? new Date(data.date).toDateString()
        : new Date().toDateString(),
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $push: { exercises: exerciseDetails } },
      { new: true, runValidators: true, context: 'query' }
    )

    const addedExercise =
      updatedUser.exercises[updatedUser.exercises.length - 1]

    res.json({
      username: updatedUser.username,
      _id: updatedUser._id,
      description: addedExercise.description,
      duration: addedExercise.duration,
      date: new Date(addedExercise.date).toDateString(),
    })
  } catch (error) {
    console.log('Error: ', error)
  }
}

const getUserLog = async (req, res) => {
  const { _id } = req.params
  const fromAndTo = {}
  const user = await User.findById(_id).select('-exercises._id')

  if (req.query.from || req.query.to) {
    const from = req.query.from
      ? new Date(req.query.from)
      : new Date('1990-01-01')
    const to = req.query.to ? new Date(req.query.to) : new Date()

    if (req.query.from) {
      fromAndTo.from = new Date(from).toDateString()
    }

    if (req.query.to) {
      fromAndTo.to = new Date(to).toDateString()
    }

    console.log(fromAndTo)

    let filteredLog = user.exercises.filter((exercise) => {
      if (exercise.date >= from && exercise.date <= to) {
        return exercise
      }
    })

    if (req.query.limit) {
      filteredLog = filteredLog.slice(-Number(req.query.limit))
    }

    console.log(filteredLog)
    return res.json({
      username: user.username,
      _id: user._id,
      ...fromAndTo,
      count: filteredLog.length,
      log: filteredLog,
    })
  }

  let log = user.exercises.map((exercise) => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
    }
  })

  if (req.query.limit) {
    log = log.slice(-Number(req.query.limit))
  }

  res.json({
    username: user.username,
    _id: user._id,
    count: log.length,
    log,
  })
}

module.exports = { getAllUsers, createUser, createExercise, getUserLog }
