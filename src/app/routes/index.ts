import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { ScheduleRoutes } from '../modules/schedule/schedule.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';
import { doctorScheduleRoutes } from '../modules/doctorSchedule/doctorSchedule.route';
import { AppointmentRoutes } from '../modules/appointment/appointment.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/schedule",
        route: ScheduleRoutes
    },
    {
        path: "/doctor",
        route: DoctorRoutes
    },
    {
        path: "/doctor-schedule",
        route: doctorScheduleRoutes 
    },
    {
        path: "/appointment",
        route: AppointmentRoutes 
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;