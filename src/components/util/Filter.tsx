import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import useAxios from '@/hooks/useAxios';

interface Category {
    id: number;
    name: string;
    image: string; // Added image field
}

interface Props {
    categories: Category[];
    selectedCategory: string;
    onChange: (value: string) => void;
}

const Filter = ({ categories = [], selectedCategory, onChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', image: '' });
    const axios = useAxios();

    const handleAddCategory = async () => {
        if (!newCategory.name || !newCategory.image) {
            toast.error('Please provide both name and image URL.');
            return;
        }
        try {
            await axios.post('/categories', newCategory);
            toast.success('Category added!');
            setNewCategory({ name: '', image: '' });
            setIsOpen(false);
        } catch (error) {
            console.error('Error adding category:', error);
            toast.error('Failed to add category');
        }
    };

    return (
        <div className="flex justify-end mb-4 max-w-xs mx-auto">
            <div className="w-64 text-black">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                    Filter by Category
                </Label>
                <Select
                    value={selectedCategory}
                    onValueChange={onChange}
                    aria-label="Filter by Category"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">All Categories</SelectItem>
                            {Array.isArray(categories) &&
                                categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                        <div className="flex items-center gap-2">
                                            {cat.image && (
                                                <img
                                                    src={cat.image}
                                                    alt={`${cat.name} icon`}
                                                    className="w-6 h-6 object-cover rounded"
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcv30VQRHT9Gfcc_7RaEpDzwN8YCujA4wdw&s'; // Fallback image
                                                    }}
                                                />
                                            )}
                                            <span>{cat.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                        </SelectGroup>
                        <div className="px-2 py-1 border-t border-gray-200 text-center">
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="text-blue-600 text-sm w-full"
                                    >
                                        ➕ Add New Category
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Category</DialogTitle>
                                        <DialogDescription>
                                            Enter the category name and image URL.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="cat-name">Name</Label>
                                            <Input
                                                id="cat-name"
                                                type="text"
                                                placeholder="Category name"
                                                value={newCategory.name}
                                                onChange={(e) =>
                                                    setNewCategory((prev) => ({
                                                        ...prev,
                                                        name: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cat-image">Image URL</Label>
                                            <Input
                                                id="cat-image"
                                                type="text"
                                                placeholder="http://example.com/image.jpg"
                                                value={newCategory.image}
                                                onChange={(e) =>
                                                    setNewCategory((prev) => ({
                                                        ...prev,
                                                        image: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <DialogClose asChild>
                                                <Button variant="ghost">Cancel</Button>
                                            </DialogClose>
                                            <Button onClick={handleAddCategory}>Save</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default Filter;