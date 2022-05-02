
const express = require('express')
const router = express.Router();
const multer = require('multer')
const Cloudinary =  require ('../db/cloudinary')

const storage =multer.diskStorage({
    // inseting out uploading files into the destination ......
    // destination: function (req, file, cb){
    //     cb(null, './uploads/');
    // },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }   
})
//specifying the file type...
const filterType = (req, file, cb)=>{
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg"){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage:storage,
    fileFilter:filterType
})


router.post('/register', upload.single('uploadImage'), async (req,res)=>{
    try{
        const uplaodToCLoud = await Cloudinary.uploader.upload(req.file.path);
        if(uplaodToCLoud){
            console.log(req.file);
            res.send(uplaodToCLoud);
        }

    }catch(err){
        console.log(err)
    }
})


module.exports = router;