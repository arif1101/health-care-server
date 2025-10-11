import z, { email } from "zod";


const createPatientValidationSchema = z.object({
    password: z.string(),
    patient: z.object({
        name: z.string().nonempty("name is required"),
        email: z.string().nonempty("Email is required"),
        address: z.string().optional()
    })
});

export const UserValidation = {
    createPatientValidationSchema
}