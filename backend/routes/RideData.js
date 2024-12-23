import express from 'express';
import { getRides,createRide,cancelRide,bookRide,getAllRides, getRidesForPassenger, cancelPassengerBooking} from '../services/rides.js';
const router = express.Router();    

router.get('/',async(req,res)=>{
    const response = await getRides(req);

    response ?  res.status(200).json({data:response,success:true}) : res.status(500).json({error: "Error while fetching Data"}) ;
})

router.post('/',async(req,res)=>{

    const response = await createRide(req);
   
    response ?  res.status(200).json({data:response,success:true}) : res.status(500).json({error: "Error while fetching Data"}) ;
})
router.get("/book",async(req,res)=>{
    const response = await bookRide(req);

    response ?  res.status(200).json({success:true}) : res.status(500).json({error: "Error while fetching Data"}) ;
})
router.get("/cancel",async(req,res)=>{
    const response = await cancelRide(req);

    response ?  res.status(200).json({data:response,success:true}) : res.status(500).json({error: "Error while fetching Data"}) ;
})
router.get("/all",async(req,res)=>{
    const response = await getAllRides(req);

    response ?  res.status(200).json({data:response,success:true}) : res.status(500).json({error: "Error while fetching Data"}) ;
})

router.post('/getPassengerRides',async(req,res)=>{

    const response = await getRidesForPassenger(req);
    // console.log(req.body, "response")
    response ?  res.status(200).json({data:response,success:true}) : res.status(500).json({error: "Error while fetching Data"}) ;
})
router.post('/cancelPassengerRide',async(req,res)=>{

    const response = await cancelPassengerBooking(req);

    response ?  res.status(200).json({data:response,success:true}) : res.status(500).json({error: "Error while fetching Data"}) ;
})
export default router;