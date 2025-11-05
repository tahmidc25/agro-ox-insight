import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  // Regenerate results with current language when language changes
  useEffect(() => {
    if (hasAnalyzed && result) {
      const weightKg = result.weight?.kg || 450;
      const ageMonths = result.age?.months || 36;
      setResult({
        breed: {
          name: t("analysis.breed.sahiwal"),
          confidence: result.breed?.confidence || 92,
          origin: t("analysis.origin.pakistanIndia"),
          avgMilk: `2,500 - 3,000 ${t("analysis.milkYield.format")}`,
        },
        weight: {
          kg: weightKg,
          range: `${weightKg - 10}-${weightKg + 10} ${t("analysis.range.format.kg")}`,
        },
        age: {
          months: ageMonths,
          range: `${ageMonths - 2}-${ageMonths + 2} ${t("analysis.range.format.months")}`,
        },
        disease: {
          name: t("analysis.health.healthy"),
          confidence: result.disease?.confidence || 95,
          summary: t("analysis.health.healthy.desc"),
          action: t("analysis.health.healthy.action"),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: t("analysis.error.invalidFile"),
        description: t("analysis.error.invalidFileDesc"),
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: t("analysis.error.fileTooLarge"),
        description: t("analysis.error.fileTooLargeDesc"),
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setResult(null);
      setHasAnalyzed(false);
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
          name: t("analysis.breed.sahiwal"),
          confidence: 92,
          origin: t("analysis.origin.pakistanIndia"),
          avgMilk: `2,500 - 3,000 ${t("analysis.milkYield.format")}`,
        },
        weight: {
          kg: 450,
          range: `440-460 ${t("analysis.range.format.kg")}`,
        },
        age: {
          months: 36,
          range: `34-38 ${t("analysis.range.format.months")}`,
        },
        disease: {
          name: t("analysis.health.healthy"),
          confidence: 95,
          summary: t("analysis.health.healthy.desc"),
          action: t("analysis.health.healthy.action"),
        },
      });
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      toast({
        title: t("analysis.success.title"),
        description: t("analysis.success.desc"),
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">{t("analysis.title")}</h1>
          <p className="text-lg text-muted-foreground">
            {t("analysis.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t("analysis.upload.title")}</CardTitle>
              <CardDescription>{t("analysis.upload.desc")}</CardDescription>
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
                      {t("analysis.upload.placeholder")}
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
                  {t("analysis.upload.choose")}
                </Button>
                <Button
                  className="flex-1"
                  onClick={analyzeImage}
                  disabled={!selectedImage || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("analysis.analyzing")}
                    </>
                  ) : (
                    t("analysis.analyze")
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
                    <CardTitle>{t("analysis.results.breed")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{t("analysis.results.breed.name")}</span>
                        <span className="text-lg text-primary">{result.breed?.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{t("analysis.results.breed.confidence")}</span>
                        <span>{result.breed?.confidence}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{t("analysis.results.breed.origin")}</span>
                        <span>{result.breed?.origin}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{t("analysis.results.breed.milk")}</span>
                        <span className="text-sm">{result.breed?.avgMilk}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("analysis.results.weight")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{t("analysis.results.weight.label")}</span>
                        <span className="text-lg text-primary">{result.weight?.kg} {t("common.kg")}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("analysis.results.weight.range")} {result.weight?.range}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{t("analysis.results.age.label")}</span>
                        <span className="text-lg text-primary">{result.age?.months} {t("analysis.results.age.months")}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("analysis.results.weight.range")} {result.age?.range}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("analysis.results.health")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{t("analysis.results.health.status")}</span>
                      <span className="text-lg text-grass-green">{result.disease?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{t("analysis.results.health.confidence")}</span>
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
                    {t("analysis.results.empty")}
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
