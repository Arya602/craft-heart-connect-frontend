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
import { useCreateArtisanMutation, useUpdateArtisanMutation } from "@/redux/api/artisansApiSlice";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

interface ArtisanFormProps {
    open: boolean;
    onClose: () => void;
    artisan?: any;
    onSuccess: () => void;
}

const ArtisanForm = ({ open, onClose, artisan, onSuccess }: ArtisanFormProps) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [craft, setCraft] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [bio, setBio] = useState("");
    const [journey, setJourney] = useState("");
    const [inspirations, setInspirations] = useState("");
    const [achievements, setAchievements] = useState("");

    const [createArtisan, { isLoading: isCreating }] = useCreateArtisanMutation();
    const [updateArtisan, { isLoading: isUpdating }] = useUpdateArtisanMutation();

    useEffect(() => {
        if (artisan) {
            setName(artisan.name);
            setAge(artisan.age.toString());
            setCraft(artisan.craft);
            setExperience(artisan.experience);
            setLocation(artisan.location);
            setImage(artisan.image);
            setBio(artisan.story?.bio || "");
            setJourney(artisan.story?.journey || "");
            setInspirations(artisan.story?.inspirations || "");
            setAchievements(artisan.story?.achievements || "");
        } else {
            resetForm();
        }
    }, [artisan, open]);

    const resetForm = () => {
        setName("");
        setAge("");
        setCraft("");
        setExperience("");
        setLocation("");
        setImage("");
        setBio("");
        setJourney("");
        setInspirations("");
        setAchievements("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const artisanData = {
            name,
            age: parseInt(age),
            craft,
            experience,
            location,
            image,
            story: {
                bio,
                journey,
                inspirations,
                achievements,
            },
        };

        try {
            if (artisan) {
                await updateArtisan({ id: artisan._id, ...artisanData }).unwrap();
                toast.success("Artisan updated successfully");
            } else {
                await createArtisan(artisanData).unwrap();
                toast.success("Artisan added successfully");
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to save artisan");
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{artisan ? "Edit Artisan" : "Add New Artisan"}</DialogTitle>
                    <DialogDescription>
                        {artisan
                            ? "Update the artisan's profile details."
                            : "Add a new artisan to your collective."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="craft">Craft</Label>
                            <Input
                                id="craft"
                                value={craft}
                                onChange={(e) => setCraft(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience">Experience</Label>
                            <Input
                                id="experience"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                placeholder="e.g. 10 years"
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
                        <Label htmlFor="image">Profile Image URL</Label>
                        <Input
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Short biography..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="journey">Journey</Label>
                        <Textarea
                            id="journey"
                            value={journey}
                            onChange={(e) => setJourney(e.target.value)}
                            placeholder="How did they start?"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="inspirations">Inspirations</Label>
                        <Textarea
                            id="inspirations"
                            value={inspirations}
                            onChange={(e) => setInspirations(e.target.value)}
                            placeholder="What inspires them?"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="achievements">Achievements</Label>
                        <Textarea
                            id="achievements"
                            value={achievements}
                            onChange={(e) => setAchievements(e.target.value)}
                            placeholder="Awards or recognition..."
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {artisan ? "Update Artisan" : "Add Artisan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ArtisanForm;
