// import OpenAI from "openai";
// import sql from "../configs/db.js";
// import { clerkClient } from "@clerk/express";
// import axios from "axios";
// import {v2 as cloudinary} from 'cloudinary';
// import fs from 'fs';
// import pdf from 'pdf-parse/lib/pdf-parse.js';



// import { Buffer } from 'buffer';


// const AI = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });


// // export const genrateArticle = async (req,res) =>{
// // try {
// //     const {userId}=req.auth();
// //     const {prompt,length} = req.body;
// //     const plan = req.plan;
// //     const free_usage = req.free_usage;
    
// //     if(plan !== 'premium' && free_usage >= 10){
// //         return res.json({success:false , message:"Limit reached. Upgrade to continue."})
// //     }

// //     const response = await AI.chat.completions.create({
// //     model: "gemini-2.0-flash",
// //     messages: [
// //           {
// //             role: "user",
// //             content: prompt,
// //         },
// //     ],
// //     temperature:0.7,
// //     max_tokens:length,
// // });
// // const content = response.choices[0].message.content

// // await sql` INSERT INTO creations (user_id, prompt, content, type)
// // VALUES (${userId}, ${prompt}, ${content} ,'article')`

// // if(plan !== 'premium'){
// // await clerkClient.users.updateUserMetadata(userId,{
// //     privateMetadata:{
// //         free_usage:free_usage+1
// //     }
// // })
// // }
// // res.json({success:true, content})

// // } catch (error) {
// //     console.log(error.message)
// //     res.json({success:false, message:error.message})
// // }
// // }

// export const genrateArticle = async (req, res) => {
//   try {
//     const { userId } = req.auth(); // ✅ correct Clerk usage
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const { prompt, length } = req.body;

//     const response = await AI.chat.completions.create({
//       model: "gemini-2.0-flash",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//       max_tokens: Math.min(length || 400, 512),
//     });

//     const content = response.choices[0].message.content;

//     return res.json({ success: true, content });

//   } catch (error) {
//     console.error("AI ERROR FULL:", error);

//     return res.status(429).json({
//       success: false,
//       message: "AI quota exceeded or invalid API key"
//     });
//   }
// };



// export const genrateBlogTitle= async (req,res) =>{
// try {
//     const {userId}=req.auth();
//     const {prompt} = req.body;
//     const plan = req.plan;
//     const free_usage = req.free_usage;
    
//     if(plan !== 'premium' && free_usage >= 10){
//         return res.json({success:false , message:"Limit reached. Upgrade to continue."})
//     }

//     const response = await AI.chat.completions.create({
//     model: "gemini-2.0-flash",
//     messages: [{ role: "user",content: prompt,}],
//     temperature:0.7,
//     max_tokens:100,
// });
// const content = response.choices[0].message.content

// await sql` INSERT INTO creations (user_id, prompt, content, type)
// VALUES (${userId}, ${prompt}, ${content} ,'blog-title')`

// if(plan !== 'premium'){
// await clerkClient.users.updateUserMetadata(userId,{
//     privateMetadata:{
//         free_usage:free_usage+1
//     }
// })
// }
// res.json({success:true, content})

// } catch (error) {
//     console.log(error.message)
//     res.json({success:false, message:error.message})
// }
// }


// export const genrateImage= async (req,res) =>{
// try {
//     const {userId}=req.auth();
//     const {prompt,publish} = req.body;
//     const plan = req.plan;

    
//     if(plan !== 'premium'){
//         return res.json({success:false , message:"This feature is only available for premium subcriptions."})
//     }

//     const formData = new FormData()
//     formData.append('prompt',prompt)
//  const {data} = await  axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{
//     headers:{ 'x-api-key': process.env.CLIPDROP_API_KEY,},
//     responseType:"arraybuffer",
//   })

//   const base64Image = `data:image/png;base64,${Buffer.from(data,'binary').toString('base64')}`;

  

//  const {secure_url}= await cloudinary.uploader.upload(base64Image)


// await sql` INSERT INTO creations (user_id, prompt, content, type,publish)
// VALUES (${userId}, ${prompt}, ${secure_url} ,'image', ${publish ?? false})`


// res.json({success:true, content:secure_url})

// } catch (error) {
//     console.log(error.message)
//     res.json({success:false, message:error.message})
// }
// }


// export const removeImageBackground= async (req,res) =>{
// try {
//     const {userId}=req.auth();
//     const image = req.file;
//     const plan = req.plan;

    
//     if(plan !== 'premium'){
//         return res.json({success:false , message:"This feature is only available for premium subcriptions."})
//     }

//   const {secure_url}= await cloudinary.uploader.upload(image.path,{
//     transformation:[
//         {
//             effect:'background_removal',
//             background_removal:'remove_the_background'
//         }
//     ]
//   })


// await sql` INSERT INTO creations (user_id, prompt, content, type)
// VALUES (${userId},'Remove background from image', ${secure_url} ,'image')`


// res.json({success:true, content:secure_url})

// } catch (error) {
//     console.log(error.message)
//     res.json({success:false, message:error.message})
// }
// }

// export const removeImageObject= async (req,res) =>{
// try {
//     const {userId}=req.auth();
//     const {object}=req.body;
//     const image = req.file;
//     const plan = req.plan;

    
//     if(plan !== 'premium'){
//         return res.json({success:false , message:"This feature is only available for premium subcriptions."})
//     }

//   const {public_id}= await cloudinary.uploader.upload(image.path)

//  const imageUrl = cloudinary.url(public_id,{
//     transformation:[{effect:`gen_remove:${object}`}],
//     resource_type: 'image'
//   })



// await sql` INSERT INTO creations (user_id, prompt, content, type)
// VALUES (${userId},${`Removed ${object} from image `}, ${imageUrl} ,'image')`


// res.json({success:true, content:imageUrl})

// } catch (error) {
//     console.log(error.message)
//     res.json({success:false, message:error.message})
// }
// }


// export const resumeReview= async (req,res) =>{
// try {
//     const {userId}=req.auth();
//     const resume = req.file;
//     const plan = req.plan;

    
//     if(plan !== 'premium'){
//         return res.json({success:false , message:"This feature is only available for premium subcriptions."})
//     }

//  if(resume.size > 5*1024*1024){
//   return res.json({success:false,message:"Resume file exceeds allowed size (5MB)."})
//  }

//  const dataBuffer = fs.readFileSync(resume.path)
//  const pdfData = await pdf(dataBuffer)

// const prompt= `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`

//  const response = await AI.chat.completions.create({
//     model: "gemini-2.0-flash",
//     messages: [{ role: "user",content: prompt,}],
//     temperature:0.7,
//     max_tokens:1000,
// });
// const content = response.choices[0].message.content

// await sql` INSERT INTO creations (user_id, prompt, content, type)
// VALUES (${userId},'Review the uploaded resume', ${content} ,'resume-review')`


// res.json({success:true, content})

// } catch (error) {
//     console.log(error.message)
//     res.json({success:false, message:error.message})
// }
// }


import OpenAI from "openai";
import sql from "../configs/db.js";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
import { Buffer } from "buffer";
import FormData from "form-data";

/* ------------------ GROQ CLIENT ------------------ */
if (!process.env.GROQ_API_KEY) {
  throw new Error("❌ GROQ_API_KEY is missing");
}

const AI = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

/* ------------------ HELPERS ------------------ */
const getUserId = (req) => {
  try {
    return req.auth()?.userId;
  } catch {
    return null;
  }
};

/* ------------------ ARTICLE ------------------ */
export const generateArticle = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { prompt, length } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Updated model name
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: Math.min(Number(length) || 400, 800),
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response from AI");
    }

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error("GROQ ARTICLE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Article generation failed",
    });
  }
};

/* ------------------ BLOG TITLE ------------------ */
export const generateBlogTitle = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ success: false });

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt required" });
    }

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Updated model name
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 120,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error("GROQ BLOG ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------------ IMAGE GENERATION ------------------ */
export const generateImage = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ success: false });

    const { prompt, publish } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt required" });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(data).toString(
      "base64"
    )}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("IMAGE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------------ REMOVE IMAGE BACKGROUND ------------------ */
export const removeImageBackground = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ success: false });

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image required" });
    }

    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      transformation: [{ effect: "background_removal" }],
    });

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("BG REMOVE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------------ REMOVE IMAGE OBJECT ------------------ */
export const removeImageObject = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ success: false });

    const { object } = req.body;
    if (!object || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Object name and image required",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(req.file.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
    });

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.error("OBJECT REMOVE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------------ RESUME REVIEW ------------------ */
export const resumeReview = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ success: false });

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Resume required" });
    }

    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume exceeds 5MB limit",
      });
    }

    const pdfData = await pdf(fs.readFileSync(req.file.path));

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Updated model name
      messages: [{ role: "user", content: pdfData.text }],
      temperature: 0.6,
      max_tokens: 700,
    });

    res.json({ success: true, content: response.choices[0].message.content });
  } catch (error) {
    console.error("RESUME ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};