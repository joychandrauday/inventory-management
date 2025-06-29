import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Category {
    id: number;
    name: string;
}

interface FormData {
    name: string;
    price: string;
    image: string;
    category_id: string;
}

interface Props {
    categories: Category[];
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const AddProductForm = ({ categories, formData, setFormData, onSubmit }: Props) => {
    return (
        <form
            onSubmit={onSubmit}
            className=""
        >

            <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                    id="image"
                    type="text"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label htmlFor="category">Category</Label>
                <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    required
                >
                    <SelectTrigger id="category" className="w-full">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" className="w-full">
                Add Product
            </Button>
        </form>
    );
};

export default AddProductForm;
