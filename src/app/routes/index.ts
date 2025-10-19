import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { ScheduleRoutes } from '../modules/schedule/schedule.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';


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
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;