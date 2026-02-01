// import express from 'express'
// import { auth } from '../middlewares/auth.js';
// import { genrateArticle, genrateBlogTitle, genrateImage, removeImageBackground, removeImageObject, resumeReview } from '../controllers/aiController.js';
// import { upload } from '../configs/multer.js';


// const aiRouter = express.Router();

// aiRouter.post('/generate-article',auth,genrateArticle)
// aiRouter.post('/generate-blog-title',auth,genrateBlogTitle)
// aiRouter.post('/generate-image',auth,genrateImage)
// aiRouter.post('/remove-image-background', upload.single('image'), auth,removeImageBackground)
// aiRouter.post('/remove-image-object', upload.single('image'), auth,removeImageObject)
// aiRouter.post('/resume-review', upload.single('resume'), auth,resumeReview)


// export default aiRouter;

//new ai fixed 
import express from "express";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  resumeReview,
} from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";

const aiRouter = express.Router();

/* 📝 TEXT AI */
aiRouter.post("/generate-article", generateArticle);
aiRouter.post("/generate-blog-title", generateBlogTitle);

/* 🎨 IMAGE AI */
aiRouter.post("/generate-image", generateImage);
aiRouter.post(
  "/remove-image-background",
  upload.single("image"),
  removeImageBackground
);

/* 📄 RESUME */
aiRouter.post(
  "/resume-review",
  upload.single("resume"),
  resumeReview
);

export default aiRouter;
