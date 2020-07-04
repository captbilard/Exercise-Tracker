const express = require('express')
const router = express.Router()

//create a user
//Users array
let users = []
//initialise id variable with zero
let id = 0;
router.post('/exercise/new-user', (req, res)=>{
  let username = req.body.username;
  id= id+1
  users.push({
    'username': username,
    'id': id
  })
  console.log(users)
  res.status(201).json({"username":users[id-1].username, 'id':users[id -1].id})
});

//Get an array of all users
router.get('/exercise/users', (req, res)=>{
    res.status(200).send(users)
})

// Add an exercise to a user
router.post('/exercise/add', (req, res)=>{
    let userId = req.body.userId;
    let user_index = users.findIndex((user)=> user.id == userId)
    
    if(user_index === -1){
        res.json({"error":`User with id ${userId} not found`})
    }
    let description = req.body.description;
    let duration = req.body.duration;
    let date = req.body.date
    if(date === ""){
        let today = new Date()
        date = today.toDateString()
    }
    users[user_index].log = []
    users[user_index].log.push({
        "description": description,
        "duration":duration,
        "date": date

    })
    // users[user_index].description = description
    // users[user_index].duration = duration
    // users[user_index].date = date
    // console.log(users[user_index])
    res.status(201).send(users[user_index])
})

//Retrieve a full exercise log of any user through the user id
router.get("/exercise/log/:id", (req, res)=>{
    let userId = req.params.id
    let user_index = users.findIndex((user)=> user.id == userId)
    if(user_index === -1){
        res.json({"error":`User with id ${userId} not found`})
    }
    if(!req.query){
        users[user_index].count = users[user_index].log.length
        res.status(200).send(users[user_index])

    }else{
        users[user_index].count = req.query.limit
        res.status(200).json({"log":users[user_index].log})
    }
})



module.exports = router