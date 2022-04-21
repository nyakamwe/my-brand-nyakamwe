"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//storage engine
const storage = _multer.default.diskStorage({
  destination: './uploads/blog/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${_path.default.extname(file.originalname)}`);
  }
}); //upload image


const upload = (0, _multer.default)({
  storage: storage
}); // app.post('/upload', upload.single('poster'), (req, res)=>{
// 	res.json({
//         success:1,
//         posterUrl:`http://localhost:3000/poster/${req.file.filename}`
//     })
// })    

var _default = upload;
exports.default = _default;