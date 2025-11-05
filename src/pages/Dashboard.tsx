import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Activity, DollarSign, Beef } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: t("dashboard.stats.cattle"),
      value: "12",
      icon: <Beef className="h-4 w-4" />,
      trend: "+2 this month",
    },
    {
      title: t("dashboard.stats.weight"),
      value: `425 ${t("common.kg")}`,
      icon: <Activity className="h-4 w-4" />,
      trend: `+15 ${t("common.kg")} growth`,
    },
    {
      title: t("dashboard.stats.cost"),
      value: `${t("common.currency")}42,000`,
      icon: <DollarSign className="h-4 w-4" />,
      trend: "Feed + Healthcare",
    },
    {
      title: t("dashboard.stats.health"),
      value: "94%",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: "Excellent",
    },
  ];

  const recentAnalyses = [
    { id: 1, date: "2024-01-15", breed: "Sahiwal", weight: 450, health: "Healthy" },
    { id: 2, date: "2024-01-12", breed: "Pabna", weight: 420, health: "Healthy" },
    { id: 3, date: "2024-01-08", breed: "Red Chittagong", weight: 380, health: "Healthy" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-foreground">{t("dashboard.title")}</h1>
          <p className="text-lg text-muted-foreground">
            {t("dashboard.subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Analyses */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t("dashboard.recent.title")}</CardTitle>
            <CardDescription>{t("dashboard.recent.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between rounded-lg border bg-card p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{analysis.breed}</p>
                    <p className="text-sm text-muted-foreground">{analysis.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{t("dashboard.recent.weight")}</p>
                      <p className="font-semibold">{analysis.weight} {t("common.kg")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{t("dashboard.recent.health")}</p>
                      <p className="font-semibold text-grass-green">{analysis.health}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>{t("dashboard.actions.title")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button asChild>
              <Link to="/analysis">{t("dashboard.actions.analysis")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/nutrition">{t("dashboard.actions.nutrition")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/advisor">{t("dashboard.actions.advice")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
