import express from 'express'
import { getUserDetails, signIn,signUp, updateUsername} from '../controllers/auth_controllers.js'
import {fetchUser}  from '../controllers/auth_controllers.js';
import { checkAuthorization } from '../middleware/ValidateUser.js';


const router=express.Router();
router.post("/signin",signIn);
//dasdkjaas
router.post("/signup",signUp);
router.post("/fetchUser",checkAuthorization,fetchUser);
//daskjdnasdas
router.post("/getUserDetails",checkAuthorization,getUserDetails);

//das.kdasdassdasdasdas
router.post("/updateUser",checkAuthorization,updateUsername);




export default router;