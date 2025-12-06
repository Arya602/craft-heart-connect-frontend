import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useCreateReportMutation } from "@/redux/api/reportsApiSlice";
import { Loader2 } from "lucide-react";

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    entityId: string;
    entityType: "User" | "Product";
    entityName: string;
}

const REPORT_REASONS = [
    "Inappropriate Content",
    "Scam or Fraud",
    "Fake Product",
    "Harassment",
    "Other",
];

const ReportModal = ({
    isOpen,
    onClose,
    entityId,
    entityType,
    entityName,
}: ReportModalProps) => {
    const [reason, setReason] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState(""); // In a real app, this would be a file upload returning a URL

    const [createReport, { isLoading }] = useCreateReportMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason) {
            toast.error("Please select a reason for reporting.");
            return;
        }

        try {
            await createReport({
                reportedEntity: entityId,
                entityType,
                reason,
                details,
                image,
            }).unwrap();
            toast.success("Report submitted successfully. We will review it shortly.");
            onClose();
            // Reset form
            setReason("");
            setDetails("");
            setImage("");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to submit report");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Report {entityType}</DialogTitle>
                    <DialogDescription>
                        Report {entityName} for violating our community guidelines.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason</Label>
                        <Select onValueChange={setReason} value={reason}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                                {REPORT_REASONS.map((r) => (
                                    <SelectItem key={r} value={r}>
                                        {r}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="details">Details</Label>
                        <Textarea
                            id="details"
                            placeholder="Please provide more details..."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>
                    {/* Placeholder for Image Upload - keeping it simple for now as per requirements */}
                    {/* <div className="space-y-2">
            <Label htmlFor="image">Evidence (Optional Image URL)</Label>
            <Input
              id="image"
              placeholder="https://example.com/evidence.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div> */}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} variant="destructive">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Report
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReportModal;
