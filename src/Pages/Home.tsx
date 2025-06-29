/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';
import Navbar from '@/components/util/Header';
import AddProductForm from '@/components/util/AddProductForm';
import Filter from '@/components/util/Filter';
import ProductTable from '@/components/util/ProductTable';
import useFetchProduct from '@/hooks/useFetchProduct';
import useCategory from '@/hooks/useCategory';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import useAxios from '@/hooks/useAxios';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category_id: number;
    category_name: string;
}

interface FormData {
    name: string;
    price: string;
    image: string;
    category_id: string;
}

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { products, refetchProducts, isLoading, isError } = useFetchProduct(
        selectedCategory === 'all' ? '' : selectedCategory
    );
    const { categories } = useCategory();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        price: '',
        image: '',
        category_id: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axios = useAxios();

    const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                price: parseFloat(formData.price),
                image: formData.image,
                category_id: parseInt(formData.category_id),
            };
            await axios.post('/products', payload);
            toast.success('Product added successfully!');
            refetchProducts();
            setFormData({ name: '', price: '', image: '', category_id: '' });
            setIsModalOpen(false);
        } catch (error: any) {
            console.error('Error adding product:', error);
            if (error.code === 'ERR_NETWORK') {
                toast.error('Network error: Unable to connect to the server. Please check your connection or server status.');
            } else {
                toast.error(error.response?.data?.error || 'Failed to add product. Please try again.');
            }
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/products/${id}`);
            toast.success('Product deleted successfully!');
            refetchProducts();
        } catch (error: any) {
            console.error('Error deleting product:', error);
            if (error.code === 'ERR_NETWORK') {
                toast.error('Network error: Unable to connect to the server. Please check your connection or server status.');
            } else {
                toast.error(error.response?.data?.error || 'Failed to delete product. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="p-4 md:p-6 max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800">📦 Product Inventory</h2>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                + Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to add a new product to the inventory.
                                </DialogDescription>
                            </DialogHeader>
                            <AddProductForm
                                categories={categories || []}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={handleAddProduct}
                            />
                            <DialogClose asChild>
                                <Button variant="ghost" className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                                    ✕
                                </Button>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                </div>
                <Filter
                    categories={categories || []}
                    selectedCategory={selectedCategory}
                    onChange={(value) => setSelectedCategory(value)}
                />
                {isLoading && <p className="text-center text-gray-500">Loading products...</p>}
                {isError && <p className="text-center text-red-500">Failed to load products.</p>}
                <ProductTable products={products || []} onDelete={handleDelete} />
            </main>
        </div>
    );
};

export default Home;