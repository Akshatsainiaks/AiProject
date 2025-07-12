import express from 'express'
import { auth } from '../middlewares/auth.js';
import { genrateArticle, genrateBlogTitle, genrateImage, removeImageBackground, removeImageObject, resumeReview } from '../controllers/aiController.js';
import { upload } from '../configs/multer.js';


const aiRouter = express.Router();

aiRouter.post('/generate-article',auth,genrateArticle)
aiRouter.post('/generate-blog-title',auth,genrateBlogTitle)
aiRouter.post('/generate-image',auth,genrateImage)
aiRouter.post('/remove-image-background', upload.single('image'), auth,removeImageBackground)
aiRouter.post('/remove-image-object', upload.single('image'), auth,removeImageObject)
aiRouter.post('/resume-review', upload.single('resume'), auth,resumeReview)








export default aiRouter;