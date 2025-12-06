import { useGetReportsQuery, useUpdateReportStatusMutation } from "@/redux/api/reportsApiSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "react-toastify";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const AdminReportsPage = () => {
    const { data: reports, isLoading, refetch } = useGetReportsQuery({});
    const [updateReportStatus, { isLoading: isUpdating }] = useUpdateReportStatusMutation();
    const [selectedReport, setSelectedReport] = useState<any>(null);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await updateReportStatus({ id, status }).unwrap();
            toast.success(`Report marked as ${status}`);
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update status");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Report Management</h1>

            <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Reporter</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Entity</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports?.map((report: any) => (
                            <TableRow key={report._id}>
                                <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{report.reporter?.username || "Unknown"}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{report.entityType}</Badge>
                                </TableCell>
                                <TableCell>
                                    {report.entityType === 'Product' ? report.reportedEntity?.title : report.reportedEntity?.username}
                                </TableCell>
                                <TableCell>{report.reason}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            report.status === "resolved"
                                                ? "default" // Using default (primary) for resolved/positive
                                                : report.status === "dismissed"
                                                    ? "secondary"
                                                    : "destructive" // Using destructive for pending/action needed
                                        }
                                        className={
                                            report.status === "resolved" ? "bg-green-600 hover:bg-green-700" : ""
                                        }
                                    >
                                        {report.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="sm" onClick={() => setSelectedReport(report)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Report Details</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="font-semibold">Reason</h4>
                                                        <p>{selectedReport?.reason}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold">Details</h4>
                                                        <p>{selectedReport?.details || "No details provided."}</p>
                                                    </div>
                                                    {selectedReport?.image && (
                                                        <div>
                                                            <h4 className="font-semibold">Evidence</h4>
                                                            <img src={selectedReport.image} alt="Evidence" className="max-w-full h-auto rounded" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h4 className="font-semibold">Reporter</h4>
                                                        <p>{selectedReport?.reporter?.username} ({selectedReport?.reporter?.email})</p>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        {report.status === "pending" && (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                    onClick={() => handleStatusUpdate(report._id, "resolved")}
                                                    disabled={isUpdating}
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-gray-500 hover:text-gray-700"
                                                    onClick={() => handleStatusUpdate(report._id, "dismissed")}
                                                    disabled={isUpdating}
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {reports?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No reports found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminReportsPage;
