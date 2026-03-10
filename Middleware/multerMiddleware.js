import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  
  export default upload;


  export const checkImageUpload = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
    }
    req.body.image = req.file.path;
    next();
};
