import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category_id: number;
    category_name: string;
}

interface Props {
    products: Product[];
    onDelete: (id: number) => void;
}

const ProductTable = ({ products, onDelete }: Props) => {
    if (!products.length) {
        return <p className="text-center text-gray-500 mt-6">No products found.</p>;
    }

    return (
        <div className="w-full overflow-auto rounded-lg border shadow-sm bg-white">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price (৳)</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id} className="text-black">
                            <TableCell>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 rounded object-cover"

                                />
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>
                                ৳{isNaN(Number(product.price)) ? '0.00' : Number(product.price).toFixed(2)}
                            </TableCell>
                            <TableCell>{product.category_name}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => onDelete(product.id)}
                                >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProductTable;
