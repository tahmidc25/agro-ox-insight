import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface AnalysisResult {
  breed?: { name: string; confidence: number; origin: string; avgMilk: string };
  weight?: { kg: number; range: string };
  age?: { months: number; range: string };
  disease?: { name: string; confidence: number; summary: string; action: string };
}

const CattleAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate analysis with mock data
    setTimeout(() => {
      setResult({
        breed: {
          name: "Sahiwal",
          confidence: 92,
          origin: "Pakistan/India",
          avgMilk: "2,500 - 3,000 liters/year",
        },
        weight: {
          kg: 450,
          range: "440-460 kg",
        },
        age: {
          months: 36,
          range: "34-38 months",
        },
        disease: {
          name: "Healthy",
          confidence: 95,
          summary: "No visible signs of disease detected",
          action: "Continue regular health monitoring",
        },
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Your cattle has been successfully analyzed",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Cattle Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Upload a photo to detect breed, estimate weight & age, and check for diseases
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select a clear photo of your cattle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border bg-secondary/30 p-12">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected cattle"
                    className="max-h-64 rounded-lg object-contain"
                  />
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop or click to upload
                    </p>
                  </>
                )}
              </div>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  Choose Image
                </Button>
                <Button
                  className="flex-1"
                  onClick={analyzeImage}
                  disabled={!selectedImage || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-4">
            {result ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Breed Detection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Breed:</span>
                        <span className="text-lg text-primary">{result.breed?.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Confidence:</span>
                        <span>{result.breed?.confidence}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Origin:</span>
                        <span>{result.breed?.origin}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Avg. Milk Yield:</span>
                        <span className="text-sm">{result.breed?.avgMilk}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weight & Age Estimation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Estimated Weight:</span>
                        <span className="text-lg text-primary">{result.weight?.kg} kg</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Range: {result.weight?.range}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Estimated Age:</span>
                        <span className="text-lg text-primary">{result.age?.months} months</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Range: {result.age?.range}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Health Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Status:</span>
                      <span className="text-lg text-grass-green">{result.disease?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Confidence:</span>
                      <span>{result.disease?.confidence}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.disease?.summary}</p>
                    <p className="text-sm font-medium text-primary">{result.disease?.action}</p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex min-h-[400px] items-center justify-center p-12">
                  <p className="text-center text-muted-foreground">
                    Upload an image and click analyze to see results
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CattleAnalysis;
