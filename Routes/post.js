const express = require('express')
const router = new express.Router()
const Profile = require('../profile');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif"
};


router.get('/pagination', function (req, res) {
	Profile.find().then(prof => {
		if (prof) {
			
			res.status(200).json({
				message: "Profile fetched successfully!",
				profile: prof
			});
		} else {
			res.status(404).json({ message: "Profile not found!" });
		}
	})
	.catch(e=>{
		console.log(e)
	});
	var page = req.params.id;
	var offset = (page * 2) - 2;
	if(page == 1){
		var offset = 0;
	}
	// con.query("SELECT * FROM customers order by id desc", function (err, result, fields) {
	// 	if (err) throw err;
	// 	res.send(result);
	// });
})
router.post('/adduser', function (req, res) {
	console.log("hi from node");
    const user = new Profile({
        email: "req.body.email",
        name: "req.body.name",
        contact: "req.body.contact"
      });
	  Profile.save().then(result => {
        if(!result){
          return res.status(500).json({
            message: "Error Creating USer"
          })
        }
        res.status(201).json({
          message: "User created!",
          result: result
        });
    })
})



module.exports = router