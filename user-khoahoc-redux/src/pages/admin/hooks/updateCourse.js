import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { courseSchema } from '../schemas/schemas';

const updateCourse = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(courseSchema),
    });

    const updateCourse = data => {
        console.log(data);
    };

  return (
    register,
    handleSubmit,
    errors,
    updateCourse
  )
}

export default updateCourse;