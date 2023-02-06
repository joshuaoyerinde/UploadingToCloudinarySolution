
const express = require('express')
const router = express.Router();
const multer = require('multer')
const Cloudinary =  require ('../db/cloudinary')

const storage =multer.diskStorage({
    // inserting  uploading files into the destination ......
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


router.post('/upload', upload.single('uploadImage'), async (req,res)=>{
    try{
        console.log(req.body.email)
        let {name, email, password} = req.body
        const uplaodToCLoud = await Cloudinary.uploader.upload(req.file.path);
        if(uplaodToCLoud){
            console.log(req.file);
            res.send(uplaodToCLoud);
            let sql = `INSERT INTO registration_tb(name,email,password) VALUES (?,?,?)`;
            connect.query(sql,[name, email, password], (err, result)=>{
                if (err){
                    res.status(500).send(
                        err
                     );
                }else{
                    if(result){
                        res.status(200).json({
                            message:"registered successful",
                            data:result
                        })
         
                    }else{
                        res.status(500).send(
                            err
                         );
                    }
                }
            })
        }
    }catch(err){
        console.log(err)
    }
})


module.exports = router;