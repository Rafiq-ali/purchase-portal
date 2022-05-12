const multer = require('multer');
const csvFilter=(req,file,cb)=>{
    if(file.mimetype.includes('csv')){
        cb(null,true);
    }
    else{
        cb('please upload only csv file',false)
    }
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });
module.exports=upload;