import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
    selectedCategory: string;
    onChange: (value: string) => void;
}

const Filter = ({ categories = [], selectedCategory, onChange }: Props) => (
    <div className="flex justify-end mb-4 max-w-xs mx-auto">
        <div className="w-64  text-black">
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
                        {/* safe map */}
                        {Array.isArray(categories) &&
                            categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
);

export default Filter;
