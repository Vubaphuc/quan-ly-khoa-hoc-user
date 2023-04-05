import { useGetAllCategoryQuery } from "../../../app/service/categoryService"
import { useGetAllUserQuery } from "../../../app/service/userService";


const useFetchQuery = () => {
    // lay danh sach category
    const { data: categories, isLoading: isLoadingCategory } = useGetAllCategoryQuery();
    // lay danh sach user
    const { data: users, isLoading: isLoadingUser } = useGetAllUserQuery();

    return {
        categories,
        users,
        isLoading: isLoadingCategory || isLoadingUser
    }
}

export default useFetchQuery;