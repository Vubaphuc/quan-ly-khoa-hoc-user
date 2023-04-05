export const getCategoryOptions = (categorys) => {
    if(!categorys) {
        return [];
    }
    return categorys.map((category) => {
        return {
            label: category.name,
            value: category.id,
        }
    })
}

export const getUserOptions = (users) => {
    if (!users) {
        return [];
    }
    return users.map((user) => {
        return {
            label: user.name,
            value: user.id,
        };
    });
}

export const getTypeOptions = () => {
    return [
        { label: "Phòng Lab", value: "onlab" },
        { label: "Trực tuyến", value: "online" },
    ];
}