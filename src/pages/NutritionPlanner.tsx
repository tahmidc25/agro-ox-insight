import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

  const generatePlan = async () => {
    if (!breed || !age || !weight) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
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
        title: "Plan Generated",
        description: "Your nutrition plan is ready",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Nutrition Planner</h1>
          <p className="text-lg text-muted-foreground">
            Get personalized feed recommendations based on breed, age, and weight
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Cattle Information</CardTitle>
              <CardDescription>Enter details to generate nutrition plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Select value={breed} onValueChange={setBreed}>
                  <SelectTrigger id="breed">
                    <SelectValue placeholder="Select breed" />
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
                <Label htmlFor="age">Age (months)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 36"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 450"
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
                    Generating Plan...
                  </>
                ) : (
                  "Generate Nutrition Plan"
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
                    <CardTitle>Daily Nutritional Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Dry Matter:</span>
                      <span className="font-semibold">{plan.dailyDryMatter} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Protein:</span>
                      <span className="font-semibold">{plan.protein} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Fiber:</span>
                      <span className="font-semibold">{plan.fiber} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Minerals:</span>
                      <span className="font-semibold">{plan.minerals} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Water:</span>
                      <span className="font-semibold">{plan.water} liters</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Feed Recommendations</CardTitle>
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
                        <span className="font-semibold text-primary">৳{feed.cost}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Estimated Daily Cost:</span>
                      <span className="text-2xl font-bold text-primary">৳{plan.estimatedCost}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Based on local market prices in Bangladesh
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex min-h-[400px] items-center justify-center p-12">
                  <p className="text-center text-muted-foreground">
                    Enter cattle details and generate a plan to see recommendations
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
