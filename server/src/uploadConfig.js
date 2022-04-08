import multer from 'multer';
import path from 'path';

//storage engine
const storage = multer.diskStorage({
    destination:'./uploads/blog/images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//upload image
const upload = multer({
	storage:storage
})


// app.post('/upload', upload.single('poster'), (req, res)=>{
// 	res.json({
//         success:1,
//         posterUrl:`http://localhost:3000/poster/${req.file.filename}`
//     })
// })    

export default upload