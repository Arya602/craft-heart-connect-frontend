import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateProductMutation, useUpdateProductMutation } from "@/redux/api/sellerProductsApiSlice";
import { useUploadProductImageMutation } from "@/redux/api/uploadApiSlice";
import { toast } from "react-toastify";
import { Loader2, Upload } from "lucide-react";

interface ProductFormProps {
    open: boolean;
    onClose: () => void;
    product?: any;
    onSuccess: () => void;
}

const ProductForm = ({ open, onClose, product, onSuccess }: ProductFormProps) => {
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: isUploading }] = useUploadProductImageMutation();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        countInStock: "",
        image: "",
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                description: product.description || "",
                price: product.price?.toString() || "",
                category: product.category || "",
                brand: product.brand || "",
                countInStock: product.countInStock?.toString() || "",
                image: product.image || "",
            });
        } else {
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                brand: "",
                countInStock: "",
                image: "",
            });
        }
    }, [product, open]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (value: string) => {
        setFormData({
            ...formData,
            category: value,
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            try {
                const res = await uploadProductImage(formData).unwrap();
                setFormData((prev) => ({ ...prev, image: res }));
                toast.success("Image uploaded successfully");
            } catch (err: any) {
                toast.error(err?.data?.message || "Image upload failed");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                countInStock: parseInt(formData.countInStock),
            };

            if (product) {
                await updateProduct({ id: product._id, ...productData }).unwrap();
                toast.success("Product updated successfully");
            } else {
                await createProduct(productData).unwrap();
                toast.success("Product created successfully");
            }

            onSuccess();
            onClose();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to save product");
        }
    };

    const isLoading = isCreating || isUpdating || isUploading;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{product ? "Edit Product" : "Create New Product"}</DialogTitle>
                    <DialogDescription>
                        {product ? "Update your product details" : "Add a new product to your store"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="e.g., Handcrafted Clay Pot"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe your product..."
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹) *</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                placeholder="1200"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="countInStock">Stock Quantity *</Label>
                            <Input
                                id="countInStock"
                                name="countInStock"
                                type="number"
                                placeholder="10"
                                value={formData.countInStock}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select onValueChange={handleSelectChange} value={formData.category} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Textiles">Textiles</SelectItem>
                                <SelectItem value="Pottery">Pottery</SelectItem>
                                <SelectItem value="Woodwork">Woodwork</SelectItem>
                                <SelectItem value="Jewelry">Jewelry</SelectItem>
                                <SelectItem value="Paintings">Paintings</SelectItem>
                                <SelectItem value="Metalwork">Metalwork</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="brand">Brand/Workshop Name *</Label>
                        <Input
                            id="brand"
                            name="brand"
                            placeholder="e.g., Earthly Crafts"
                            value={formData.brand}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Product Image *</Label>
                        <div className="flex gap-4 items-center">
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                                className="cursor-pointer"
                            />
                            {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                        </div>
                        {formData.image && (
                            <div className="mt-2 relative w-full h-40 bg-muted rounded-md overflow-hidden">
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {product ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                product ? "Update Product" : "Create Product"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductForm;
