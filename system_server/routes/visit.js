const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
  const visit = [
      {
        WeekDay: "Monday",
        visitors: 10
      },
      {
        WeekDay: "Tuesday",
        visitors: 20
      },
      {
        WeekDay: "Wednesday",
        visitors: 18
      },
      {
        WeekDay: "Thursday",
        visitors: 56
      },
      {
        WeekDay: "Friday",
        visitors: 30
      },
      {
        WeekDay: "Saturday",
        visitors: 98
      },
      {
        WeekDay: "Sunday",
        visitors: 103
      }
  ]
    res.json({
      code: 200,
      data: visit
    })
})





module.exports = router;