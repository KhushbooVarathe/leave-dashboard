var express = require('express')
const mongoose = require('mongoose')
const url =process.env.MONGO_URL

const connectionParams = {}
  mongoose
    .connect(url, connectionParams)
    .then((resp) => {
      console.log('Connected to database ')
    })
    .catch(err => {
      console.error(`Error connecting to the database. \n${err}`)
    })