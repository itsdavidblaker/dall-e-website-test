import express from 'express';
import * as dotenv from 'dotenv';
import {Configuration, OpenAIApi} from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

//Instance of OpenAI (sending the configuration, containing the key)
const openai = new OpenAIApi(configuration);

//To test it, add a demo route
//Get the route
//Open a function block and send a message
router.route('/').get((req, res) => {
res.send('Hello from Dalleee');
})

//perform the dalle request
//async is used because the request takes time
router.route('/').post(async(req,res) =>{
    try{
        const {prompt} = req.body;
        //get the image
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '512x512',
            response_format: 'b64_json'
        });

        const image = aiResponse.data.data[0].b64_json;

        //send to front end
        res.status(200).json({photo: image});
    }
    catch (error){
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;