import * as yup from "yup"
export const tableSchema = yup.object().shape({
    id: yup.number().required(),
    title: yup.string().required()
})