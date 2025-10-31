import {v4 as uuidv4} from "uuid"
import { prisma } from "../../shared/prisma";
import { IJWTPayload } from "../../types/common";




const createAppointment = async(user: IJWTPayload, payload: {doctorId: string, scheduleId: string}) => {
    // 1. patientdata by email
    const patientData = await prisma.patient.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });

    // 2. all doctorData by id and not deleted
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            id: payload.doctorId,
            isDeleted: false
        }
    });

    // 3. check isBooked from Schedule by doctorId, scheduleId, isBookd will true
    const isBookedOrNot = await prisma.doctorSchedules.findFirstOrThrow({
        where: {
            doctorId: payload.doctorId,
            scheduleId: payload.scheduleId,
            isBooked: false
        }
    })

    // 4. genereate videoCallingId
    const videoCallingId = uuidv4()
    // 5. create appointment
    const result = await prisma.$transaction(async(tnx) => {
        // a. create appointment data
        const appointmentData = await tnx.appointment.create({
            data: {
                patientId: patientData.id,
                doctorId: doctorData.id,
                scheduleId: payload.scheduleId,
                videoCallingId
            }
        })
        // b. update doctor schedule
        await tnx.doctorSchedules.update({
            where: {
                doctorId_scheduleId: {
                    doctorId: doctorData.id,
                    scheduleId: payload.scheduleId
                }
            },
            data: {
                isBooked: true
            }
        })
        const transactionId = uuidv4()
        // c. payment create
        await tnx.payment.create({
            data: {
                appointmentId: appointmentData.id,
                amount: doctorData.appointmentFee,
                transactionId
            }
        })
        return appointmentData
    })
    return result;
}

export const AppointmentService = {
    createAppointment,
};