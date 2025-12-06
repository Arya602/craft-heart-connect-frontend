import { useState } from "react";
import { useGetArtisansQuery, useDeleteArtisanMutation } from "@/redux/api/artisansApiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Plus, Edit, Trash2, User } from "lucide-react";
import { toast } from "react-toastify";
import ArtisanForm from "./ArtisanForm";

const ArtisanList = () => {
    const { data: artisans, isLoading, refetch } = useGetArtisansQuery({});
    const [deleteArtisan, { isLoading: isDeleting }] = useDeleteArtisanMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedArtisan, setSelectedArtisan] = useState<any>(null);

    const handleEdit = (artisan: any) => {
        setSelectedArtisan(artisan);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setSelectedArtisan(null);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this artisan?")) {
            try {
                await deleteArtisan(id).unwrap();
                toast.success("Artisan deleted successfully");
                refetch();
            } catch (err: any) {
                toast.error(err?.data?.message || "Failed to delete artisan");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">My Artisans</h2>
                    <p className="text-muted-foreground">Manage the artisans in your collective</p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Artisan
                </Button>
            </div>

            {artisans && artisans.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {artisans.map((artisan: any) => (
                        <Card key={artisan._id}>
                            <CardHeader>
                                <div className="aspect-video w-full overflow-hidden rounded-md mb-4 bg-muted">
                                    {artisan.image ? (
                                        <img
                                            src={artisan.image}
                                            alt={artisan.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <User className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                                <CardTitle>{artisan.name}</CardTitle>
                                <CardDescription>{artisan.craft} • {artisan.experience}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {artisan.story?.bio || "No bio available"}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleEdit(artisan)}
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleDelete(artisan._id)}
                                            disabled={isDeleting}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="py-12">
                        <div className="text-center">
                            <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No artisans yet</h3>
                            <p className="text-muted-foreground mb-4">
                                Add artisans to showcase the people behind the products
                            </p>
                            <Button onClick={handleCreate}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Artisan
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <ArtisanForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                artisan={selectedArtisan}
                onSuccess={refetch}
            />
        </div>
    );
};

export default ArtisanList;
