const tripsEndPoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

// reading json file directly is for development only
//var fs = require('fs');
//var trips = JSON.parse(fs.readFileSync('data/trips.json','utf8'));

// GET travel view
const travel = async function(req, res, next) {
    //console.log('TRAVEL CONTROLLER BEGIN')
    await fetch(tripsEndPoint, options)
        .then(res => res.json())
        .then(json => {
            //console.log(json)
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if (!json.length) {
                    message = 'No trips exist in our databse!';
                }
            }
            res.render('travel', { title: 'Travlr Getaways', trips: json, message});
        })
        .catch(err => res.status(500).send(err.message));
        //console.log('TRAVEL CONTROLLER AFTER RENDER');
};

module.exports = {
    travel
};
