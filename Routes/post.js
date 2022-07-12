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
	if(req.body.id){
		Profile.findByIdAndUpdate(req.body.id, 
			{name:req.body.name,email:req.body.email,contact:req.body.contact}, function(err, data) {
				if(err){
					console.log(err);
				}
				else{
					res.send(data);
					console.log("Data updated!");
				}
		});
	}else{
		Profile.create(req.body).then(result => {
		  if(!result){
			return res.status(500).json({
			  message: "Error Creating USer"
			})
		  }
		  res.status(201).json({
			message: "User created!",
			result: result
		  });
	  });
	}	
})

router.post('/edituser', function(req, res) {
	console.log(req.body);
	Profile.findOne({_id:req.body.id}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
			console.log(data);
            res.send(data);
        }
    });  
});
router.post('/deleteuser', function(req, res) {
	console.log(req.body);
	Profile.remove({_id:req.body.id},
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
			console.log(data);
            res.send(data);
        }
    });  
});



module.exports = router