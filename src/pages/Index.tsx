import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Leaf, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroFarm from "@/assets/hero-farm.jpg";
import aiAgriIcon from "@/assets/ai-agri-icon.png";

const Index = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI models for breed detection, weight estimation, and disease diagnosis with high accuracy.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-grass-green" />,
      title: "Smart Nutrition Planning",
      description: "Personalized feed recommendations based on breed, age, and weight with local market pricing.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-sunrise-gold" />,
      title: "Business Insights",
      description: "Expert guidance on farm setup, financial planning, and market strategies to grow your business.",
    },
    {
      icon: <Users className="h-8 w-8 text-sky-blue" />,
      title: "Farmer Dashboard",
      description: "Track your cattle's health, growth, and expenses with visual insights and historical data.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroFarm} 
            alt="Farm" 
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        <div className="container relative z-10 flex flex-col items-center gap-8 py-24 text-center md:py-32">
          <div className="flex items-center gap-4 rounded-full bg-primary/10 px-6 py-2 backdrop-blur">
            <img src={aiAgriIcon} alt="AI Agriculture" className="h-8 w-8" />
            <span className="text-sm font-semibold text-primary">Empowering Farmers with AI</span>
          </div>
          
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Transform Your Cattle Farm with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Smart AI Insights
            </span>
          </h1>
          
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            From breed detection to business planning, AgroOx AI guides you from zero to success. 
            Make informed decisions with AI-powered analysis and expert recommendations.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild className="text-base">
              <Link to="/analysis">Start Analysis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link to="/advisor">Get Business Advice</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive AI tools designed for small and medium-scale cattle farmers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-card transition-all hover:shadow-lg">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="rounded-full bg-secondary p-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container pb-20">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="flex flex-col items-center gap-6 p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Ready to Transform Your Farm?
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Join hundreds of farmers using AI to make smarter decisions and increase profitability
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">Get Started Free</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
