// src/hooks/useCategory.js
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useCategory = () => {
    const axios = useAxios();

    const {
        data: categories,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axios.get('/categories');
            console.log(res);
            return res.data.categories;
        },
    });
    return { categories, isLoading, isError, error };
};

export default useCategory;
