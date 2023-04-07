import { useNavigate } from "react-router-dom";
import { useUpdateCourseMutation } from "../../../app/service/couresService"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSchema } from "../schemas/schemas";


function useUpdate(courseId) {

    


    const [updateCourse] = useUpdateCourseMutation();




    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(courseSchema),
        mode: 'all',
    });


    const onSubmit = (data) => {
        updateCourse({ courseId,...data })
        .unwrap()
        .then(() => alert("Cập nhật thành công"))
        .catch(err => alert(err.data.message))
      };


    return {
        control, register, handleSubmit, errors, onSubmit
    }
}

export default useUpdate;