import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { courseSchema } from "../schemas/schemas";
import { useCreateCourseMutation } from "../../../app/service/couresService";
import { useNavigate } from "react-router-dom";

const useCreate = () => {
    const [addCourse, addCourseResult] = useCreateCourseMutation();
    const navigate = useNavigate();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            price: 0,
        },
        resolver: yupResolver(courseSchema),
        mode: "all",
    });

      // Function tạo khóa học
      const onCreateCourse = (data) => {
        addCourse(data)
        .unwrap()
        .then(() => navigate("/admin/khoa-hoc"))
        .catch(err => alert(err.data.message))
    };

  return {
    control,
    register,
    handleSubmit,
    errors,
    onCreateCourse,
  };
};

export default useCreate;
