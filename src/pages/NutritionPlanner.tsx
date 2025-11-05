import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";

interface NutritionPlan {
  dailyDryMatter: number;
  protein: number;
  fiber: number;
  minerals: number;
  water: number;
  estimatedCost: number;
  feedRecommendations: Array<{ name: string; amount: string; cost: number }>;
}

const NutritionPlanner = () => {
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<NutritionPlan | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const generatePlan = async () => {
    if (!breed || !age || !weight) {
      toast({
        title: t("nutrition.form.error"),
        description: t("nutrition.form.errorDesc"),
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate plan generation
    setTimeout(() => {
      setPlan({
        dailyDryMatter: 12.5,
        protein: 2.8,
        fiber: 4.2,
        minerals: 0.8,
        water: 45,
        estimatedCost: 350,
        feedRecommendations: [
          { name: "Green Grass", amount: "15 kg", cost: 75 },
          { name: "Wheat Straw", amount: "5 kg", cost: 50 },
          { name: "Concentrate Mix", amount: "3 kg", cost: 180 },
          { name: "Mineral Supplement", amount: "100 g", cost: 45 },
        ],
      });
      setIsGenerating(false);
      toast({
        title: t("nutrition.success.title"),
        description: t("nutrition.success.desc"),
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">{t("nutrition.title")}</h1>
          <p className="text-lg text-muted-foreground">
            {t("nutrition.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t("nutrition.form.title")}</CardTitle>
              <CardDescription>{t("nutrition.form.desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="breed">{t("nutrition.form.breed")}</Label>
                <Select value={breed} onValueChange={setBreed}>
                  <SelectTrigger id="breed">
                    <SelectValue placeholder={t("nutrition.form.breed.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pabna">Pabna</SelectItem>
                    <SelectItem value="red-chittagong">Red Chittagong</SelectItem>
                    <SelectItem value="sahiwal">Sahiwal</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="crossbreed">Crossbreed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">{t("nutrition.form.age")}</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder={t("nutrition.form.age.placeholder")}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">{t("nutrition.form.weight")}</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder={t("nutrition.form.weight.placeholder")}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="50"
                  max="1000"
                />
              </div>

              <Button
                className="w-full"
                onClick={generatePlan}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("nutrition.form.generating")}
                  </>
                ) : (
                  t("nutrition.form.generate")
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {plan ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("nutrition.results.title")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t("nutrition.results.dryMatter")}</span>
                      <span className="font-semibold">{plan.dailyDryMatter} {t("common.kg")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t("nutrition.results.protein")}</span>
                      <span className="font-semibold">{plan.protein} {t("common.kg")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t("nutrition.results.fiber")}</span>
                      <span className="font-semibold">{plan.fiber} {t("common.kg")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t("nutrition.results.minerals")}</span>
                      <span className="font-semibold">{plan.minerals} {t("common.kg")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t("nutrition.results.water")}</span>
                      <span className="font-semibold">{plan.water} {t("common.liters")}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("nutrition.results.feed")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {plan.feedRecommendations.map((feed, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-secondary/30 p-3"
                      >
                        <div>
                          <p className="font-medium">{feed.name}</p>
                          <p className="text-sm text-muted-foreground">{feed.amount}</p>
                        </div>
                        <span className="font-semibold text-primary">{t("common.currency")}{feed.cost}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{t("nutrition.results.cost")}</span>
                      <span className="text-2xl font-bold text-primary">{t("common.currency")}{plan.estimatedCost}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t("nutrition.results.costDesc")}
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex min-h-[400px] items-center justify-center p-12">
                  <p className="text-center text-muted-foreground">
                    {t("nutrition.results.empty")}
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

export default NutritionPlanner;
