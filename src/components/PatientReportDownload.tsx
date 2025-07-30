import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FileText, Search, Download, User, Phone, MapPin, Calendar, Clock } from "lucide-react";

interface PatientInfo {
  id: string;
  name: string;
  age: number;
  phone: string;
  location: string;
}

const PatientReportDownload = () => {
  const [patientRefNumber, setPatientRefNumber] = useState("");
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [searchError, setSearchError] = useState("");
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!patientRefNumber.trim()) return;
    
    setIsSearching(true);
    setSearchError("");
    setPatientInfo(null);

    // Simulate API call
    setTimeout(() => {
      // Check for error case
      if (patientRefNumber.trim() === "REF123") {
        setSearchError("Patient Not Found. Please retry. If unsure, you can find the patient reference number in the Demographics section in the EMR");
        setIsSearching(false);
        return;
      }

      // Mock patient data
      const mockPatient: PatientInfo = {
        id: patientRefNumber,
        name: "John Anderson",
        age: 45,
        phone: "+1 (555) 123-4567",
        location: "New York, NY"
      };
      
      setPatientInfo(mockPatient);
      setIsSearching(false);
      toast({
        title: "Patient Found",
        description: "Patient information loaded successfully."
      });
    }, 1500);
  };

  const handleGenerateReport = () => {
    setShowDownloadDialog(true);

    // Simulate report generation
    setTimeout(() => {
      setShowDownloadDialog(false);
      toast({
        title: "Report Generated",
        description: "Your patient report has been downloaded successfully."
      });
    }, 3000);
  };

  const resetSearch = () => {
    setPatientRefNumber("");
    setPatientInfo(null);
    setSearchError("");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Patient Report Download</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate and download comprehensive patient reports by entering the patient reference number below.
          </p>
        </div>

        {/* Search Card */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Patient Search
            </CardTitle>
            <CardDescription>
              Enter the patient reference number to retrieve patient information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientRef" className="text-sm font-medium">
                Patient Reference Number
              </Label>
              <div className="flex gap-3">
                <Input
                  id="patientRef"
                  placeholder="Enter patient reference number..."
                  value={patientRefNumber}
                  onChange={(e) => setPatientRefNumber(e.target.value)}
                  className="flex-1 transition-all duration-200 focus:shadow-lg"
                  disabled={isSearching}
                />
                <Button
                  onClick={handleSearch}
                  disabled={!patientRefNumber.trim() || isSearching}
                  variant="medical"
                  className="min-w-[120px]"
                >
                  {isSearching ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Error Message */}
            {searchError && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{searchError}</p>
              </div>
            )}
            
            {(patientInfo || searchError) && (
              <div className="mt-4">
                <Button onClick={resetSearch} variant="outline" size="sm" className="text-muted-foreground">
                  New Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Patient Information */}
        {patientInfo && (
          <Card className="bg-gradient-card shadow-card border-0 transform transition-all duration-500 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Patient Information
              </CardTitle>
              <CardDescription>
                Verified patient details for reference #{patientInfo.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-accent/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">Full Name</span>
                    </div>
                    <p className="text-lg font-semibold">{patientInfo.name}</p>
                  </div>
                  
                  <div className="p-4 bg-accent/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">Age</span>
                    </div>
                    <p className="text-lg font-semibold">{patientInfo.age} years old</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-accent/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">Phone Number</span>
                    </div>
                    <p className="text-lg font-semibold">{patientInfo.phone}</p>
                  </div>
                  
                  <div className="p-4 bg-accent/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">Market</span>
                    </div>
                    <p className="text-lg font-semibold">{patientInfo.location}</p>
                  </div>
                </div>
              </div>

              {/* Generate Report Section */}
              <div className="border-t pt-6 space-y-4">
                <Button
                  onClick={handleGenerateReport}
                  variant="medical"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={showDownloadDialog}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Generate Report
                </Button>
                
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <h4 className="font-medium text-warning-foreground mb-2">Important Notice</h4>
                  <div className="text-sm text-warning-foreground/80 space-y-2">
                    <p>1. Your file will be generated as a .zip file that has JSON files of all patient information and their care journey with Woundtech. Once the report is generated, you can access the file from the NOTIFICATIONS {">"} ADMIN in the EMR. The JSON files can be opened in any local text editors file like Notepad++ or your Chrome browser.</p>
                    <p>2. Generate reports only when necessary for patient care or legal requirements. Ensure you have proper authorization before downloading patient data. All report downloads requests are logged for compliance purposes.</p>
                    <p>3. Reports contain sensitive medical information. Please use wisely. Do not share via unsecured channels and store only in HIPAA compliant systems. Once your usecase is sufficed, please delete the downloaded files from all local storage systems.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Download Progress Dialog */}
        <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
          <DialogContent className="sm:max-w-md bg-gradient-card shadow-dialog border-0">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary animate-bounce" />
                Generating Report
              </DialogTitle>
              <DialogDescription className="text-left">
                Your report is being downloaded. It might take some time depending on the volume of data 
                associated with the patient. Feel free to leave this page.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-4">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PatientReportDownload;