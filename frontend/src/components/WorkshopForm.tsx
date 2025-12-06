import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateWorkshopMutation, useUpdateWorkshopMutation } from "@/redux/api/workshopsApiSlice";
import { useGetArtisansQuery } from "@/redux/api/artisansApiSlice";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

interface WorkshopFormProps {
    open: boolean;
    onClose: () => void;
    workshop?: any;
    onSuccess: () => void;
}

const WorkshopForm = ({ open, onClose, workshop, onSuccess }: WorkshopFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [schedule, setSchedule] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");
    const [maxSeats, setMaxSeats] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [artisanId, setArtisanId] = useState("");

    const { data: artisans } = useGetArtisansQuery({});
    const [createWorkshop, { isLoading: isCreating }] = useCreateWorkshopMutation();
    const [updateWorkshop, { isLoading: isUpdating }] = useUpdateWorkshopMutation();

    useEffect(() => {
        if (workshop) {
            setTitle(workshop.title);
            setDescription(workshop.description);
            // Format date for input type="datetime-local"
            const date = new Date(workshop.schedule);
            const formattedDate = date.toISOString().slice(0, 16);
            setSchedule(formattedDate);
            setDuration(workshop.duration);
            setPrice(workshop.price.toString());
            setMaxSeats(workshop.maxSeats.toString());
            setLocation(workshop.location);
            setImage(workshop.images?.[0] || "");
            setArtisanId(workshop.artisan?._id || workshop.artisan || "");
        } else {
            resetForm();
        }
    }, [workshop, open]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setSchedule("");
        setDuration("");
        setPrice("");
        setMaxSeats("");
        setLocation("");
        setImage("");
        setArtisanId("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const workshopData = {
            title,
            description,
            schedule: new Date(schedule).toISOString(),
            duration,
            price: parseFloat(price),
            maxSeats: parseInt(maxSeats),
            location,
            images: [image],
            artisan: artisanId || null,
        };

        try {
            if (workshop) {
                await updateWorkshop({ id: workshop._id, ...workshopData }).unwrap();
                toast.success("Workshop updated successfully");
            } else {
                await createWorkshop(workshopData).unwrap();
                toast.success("Workshop created successfully");
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to save workshop");
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{workshop ? "Edit Workshop" : "Create Workshop"}</DialogTitle>
                    <DialogDescription>
                        {workshop
                            ? "Update the workshop details."
                            : "Schedule a new workshop for your customers."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="schedule">Date & Time</Label>
                            <Input
                                id="schedule"
                                type="datetime-local"
                                value={schedule}
                                onChange={(e) => setSchedule(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="e.g. 2 hours"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="maxSeats">Max Seats</Label>
                            <Input
                                id="maxSeats"
                                type="number"
                                value={maxSeats}
                                onChange={(e) => setMaxSeats(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="artisan">Lead Artisan (Optional)</Label>
                        <Select value={artisanId} onValueChange={setArtisanId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an artisan" />
                            </SelectTrigger>
                            <SelectContent>
                                {artisans?.map((artisan: any) => (
                                    <SelectItem key={artisan._id} value={artisan._id}>
                                        {artisan.name} ({artisan.craft})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {workshop ? "Update Workshop" : "Create Workshop"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default WorkshopForm;
