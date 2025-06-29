import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';

const useFetchProduct = (categoryId = '') => {
    const axios = useAxios();
    const queryClient = useQueryClient();

    const {
        data: productsData,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['products', categoryId],
        queryFn: async () => {
            const url = categoryId ? `/products?category_id=${categoryId}` : '/products';
            const res = await axios.get(url);
            return res.data.products || [];
        },
    });

    const refetchProducts = () => {
        queryClient.invalidateQueries({ queryKey: ['products', categoryId] });
    };

    return { products: productsData, isLoading, isError, error, refetchProducts, refetch };
};

export default useFetchProduct;
