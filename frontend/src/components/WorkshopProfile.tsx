import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useProfileMutation } from "@/redux/api/usersApiSlice";
import { useUploadProductImageMutation } from "@/redux/api/uploadApiSlice";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2, Upload, Save } from "lucide-react";

const WorkshopProfile = () => {
    const { userInfo } = useSelector((state: any) => state.auth);
    const [updateProfile, { isLoading: isUpdating }] = useProfileMutation();
    const [uploadImage, { isLoading: isUploading }] = useUploadProductImageMutation();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        workshopName: "",
        workshopLocation: "",
        workshopDescription: "",
        workshopImage: "",
        story: "",
        craft: "",
    });

    useEffect(() => {
        if (userInfo) {
            setFormData({
                workshopName: userInfo.workshop?.name || "",
                workshopLocation: userInfo.workshop?.location || "",
                workshopDescription: userInfo.workshop?.description || "",
                workshopImage: userInfo.workshop?.image || "",
                story: userInfo.story || "",
                craft: userInfo.craft || "",
            });
        }
    }, [userInfo]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            try {
                const res = await uploadImage(formData).unwrap();
                setFormData((prev) => ({ ...prev, workshopImage: res }));
                toast.success("Workshop image uploaded");
            } catch (err: any) {
                toast.error(err?.data?.message || "Image upload failed");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedData = {
                workshop: {
                    name: formData.workshopName,
                    location: formData.workshopLocation,
                    description: formData.workshopDescription,
                    image: formData.workshopImage,
                },
                story: formData.story,
                craft: formData.craft,
            };

            const res = await updateProfile(updatedData).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Profile updated successfully");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update profile");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Workshop Profile</CardTitle>
                <CardDescription>Manage your workshop details and artisan story</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="workshopName">Workshop Name</Label>
                            <Input
                                id="workshopName"
                                name="workshopName"
                                value={formData.workshopName}
                                onChange={handleInputChange}
                                placeholder="e.g. The Clay Studio"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="craft">Primary Craft</Label>
                            <Input
                                id="craft"
                                name="craft"
                                value={formData.craft}
                                onChange={handleInputChange}
                                placeholder="e.g. Pottery"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="workshopLocation">Location</Label>
                        <Input
                            id="workshopLocation"
                            name="workshopLocation"
                            value={formData.workshopLocation}
                            onChange={handleInputChange}
                            placeholder="e.g. Jaipur, Rajasthan"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="workshopDescription">Workshop Description</Label>
                        <Textarea
                            id="workshopDescription"
                            name="workshopDescription"
                            value={formData.workshopDescription}
                            onChange={handleInputChange}
                            placeholder="Tell us about your workspace..."
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="story">Artisan Story</Label>
                        <Textarea
                            id="story"
                            name="story"
                            value={formData.story}
                            onChange={handleInputChange}
                            placeholder="Share your journey as an artisan..."
                            rows={5}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Workshop Image</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                                className="cursor-pointer"
                            />
                            {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                        </div>
                        {formData.workshopImage && (
                            <div className="mt-2 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                <img
                                    src={formData.workshopImage}
                                    alt="Workshop"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isUpdating || isUploading}>
                            {isUpdating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default WorkshopProfile;
