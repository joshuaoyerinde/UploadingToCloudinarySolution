const express = require('express')
const router = express.Router();
const multer = require('multer')
const Cloudinary =  require ('../db/cloudinary')
const connect = require('../db/db')

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
    if(file.mimetype == "image/jpeg" || file.mimetype=="image/png"){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage:storage,
    fileFilter:filterType 
});

router.post('/uploadfile', upload.single('myfile'), async (req,res)=>{
    let {title, blog_body, link} = req.body
    try{
        console.log(req.file.path);
        const uplaodToCLoud = await Cloudinary.uploader.upload(req.file.path);
        if(uplaodToCLoud){
            console.log(req.file);
           // console.log(uplaodToCLoud)
            let imglink = uplaodToCLoud. url
            let sql = `INSERT INTO blog_tb(title, blog_body, link, imageLink) VALUES (?,?,?,?)`;
           await connect.query(sql,[title, blog_body, link, imglink], (err, result)=>{
                if (err){
                    throw err
                }else{
                    if(result){
                        res.status(200).json({
                            message:"Created successfully",
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
        res.status(500).send(
            err
        );
    }
})


module.exports = router;