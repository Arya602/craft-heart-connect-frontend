import { useState } from "react";
import { useGetWorkshopsQuery, useDeleteWorkshopMutation } from "@/redux/api/workshopsApiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Edit, Trash2, Calendar, MapPin, Users, User } from "lucide-react";
import { toast } from "react-toastify";
import WorkshopForm from "./WorkshopForm";

const WorkshopList = () => {
    const { data: workshops, isLoading, refetch } = useGetWorkshopsQuery({});
    const [deleteWorkshop, { isLoading: isDeleting }] = useDeleteWorkshopMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);

    const handleEdit = (workshop: any) => {
        setSelectedWorkshop(workshop);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setSelectedWorkshop(null);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this workshop?")) {
            try {
                await deleteWorkshop(id).unwrap();
                toast.success("Workshop deleted successfully");
                refetch();
            } catch (err: any) {
                toast.error(err?.data?.message || "Failed to delete workshop");
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
                    <h2 className="text-2xl font-bold">My Workshops</h2>
                    <p className="text-muted-foreground">Manage your workshops and events</p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Workshop
                </Button>
            </div>

            {workshops && workshops.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {workshops.map((workshop: any) => (
                        <Card key={workshop._id}>
                            <CardHeader>
                                <div className="aspect-video w-full overflow-hidden rounded-md mb-4 bg-muted">
                                    {workshop.images?.[0] ? (
                                        <img
                                            src={workshop.images[0]}
                                            alt={workshop.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <Calendar className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="line-clamp-1">{workshop.title}</CardTitle>
                                        <CardDescription className="mt-1">
                                            {new Date(workshop.schedule).toLocaleDateString()} • {workshop.duration}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="secondary">₹{workshop.price}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid gap-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span className="line-clamp-1">{workshop.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            <span>
                                                {workshop.registrations?.filter((r: any) => r.status === 'confirmed').length || 0} / {workshop.maxSeats} Registered
                                            </span>
                                        </div>
                                        {workshop.artisan && (
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                <span>Led by: {workshop.artisan.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleEdit(workshop)}
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleDelete(workshop._id)}
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
                            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No workshops yet</h3>
                            <p className="text-muted-foreground mb-4">
                                Host workshops to teach your craft and engage with customers
                            </p>
                            <Button onClick={handleCreate}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Your First Workshop
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <WorkshopForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                workshop={selectedWorkshop}
                onSuccess={refetch}
            />
        </div>
    );
};

export default WorkshopList;
