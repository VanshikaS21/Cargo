import express from 'express';
import { getRides,createRide } from '../services/rides.js';
const router = express.Router();

router.get('/',async(req,res)=>{
    const response = await getRides(req);

    response ?  res.status(200).json({data:response,success:true}) : res.status(500).json({error: "Error while fetching Data"}) ;
})

router.post('/',async(req,res)=>{

    const response = await createRide(req);

    response ?  res.status(200).json({data:response,success:true}) : res.status(500).json({error: "Error while fetching Data"}) ;
})

export default router;