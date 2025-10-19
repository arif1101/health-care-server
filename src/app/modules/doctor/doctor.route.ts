import { Router } from "express";
import { DoctorControllers } from "./doctor.controller";


const router = Router()

router.get("/",DoctorControllers.getAllFromDB)

router.patch("/:id",DoctorControllers.updateIntoDB)

export const DoctorRoutes = router;