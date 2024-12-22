const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');


const tripsList = async (req, res) => {
    const q = await Model
        .find({}) 
        .exec();



    if (!q) {
        return res
            .status(404)
            .json(err);
    }
    else {
        return res
            .status(200)
            .json(q);
    }
};


const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) 
        .exec();


    if (!q) {
        return res
            .status(404)
            .json(err);
    }
    else {
        return res
            .status(200)
            .json(q);
    }
};

const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });
  
    const q = await newTrip.save();
  
    if (!q) {
      return res
        .status(400)
        .json(q);
    } else {
      return res
        .status(201)
        .json(q);
    }
  };

const tripsUpdateTrip = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
  
    const q = await Model
      .findOneAndUpdate(
        { 'code': req.params.tripCode },
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        }
      )
      .exec();
  
    if (!q) { 
      return res
        .status(400)
        .json({ message: 'Error: Trip not found or update failed' });
    } else { 
      return res
        .status(201)
        .json(q);
    }
  
  };

  const tripsDeleteTrip = async (req, res) => {
    try {
      const q = await Model.findOneAndDelete({ 'code': req.params.tripCode }).exec();
  
      if (!q) { 
        return res
          .status(404)
          .json({ message: 'Trip not found with code ' + req.params.tripCode });
      } else { 
        return res
          .status(200)
          .json({ message: 'Trip deleted' });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Server error while deleting the trip', error: err });
    }
  };
  
  module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
  
