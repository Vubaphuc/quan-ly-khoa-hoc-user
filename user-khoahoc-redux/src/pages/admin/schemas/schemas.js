import * as yup from "yup";

export const courseSchema = yup.object({
    name: yup.string().required("ten khong duoc de trong"),
    description: yup.string().required("mo ta khong duoc de trong"),
    price: yup.number().typeError("khong dung dinh dang").min(0,"gia phai >= 0")
});



