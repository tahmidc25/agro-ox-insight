import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.analysis": "Cattle Analysis",
    "nav.nutrition": "Nutrition Planner",
    "nav.advisor": "Business Advisor",
    "nav.dashboard": "Dashboard",
    "nav.getStarted": "Get Started",
    "nav.language": "Language",
    
    // Home Page
    "home.title": "Transform Your Cattle Farm with Smart AI Insights",
    "home.subtitle": "From breed detection to business planning, AgroOx AI guides you from zero to success. Make informed decisions with AI-powered analysis and expert recommendations.",
    "home.startAnalysis": "Start Analysis",
    "home.getAdvice": "Get Business Advice",
    "home.features.title": "Everything You Need to Succeed",
    "home.features.subtitle": "Comprehensive AI tools designed for small and medium-scale cattle farmers",
    "home.feature1.title": "AI-Powered Analysis",
    "home.feature1.desc": "Advanced AI models for breed detection, weight estimation, and disease diagnosis with high accuracy.",
    "home.feature2.title": "Smart Nutrition Planning",
    "home.feature2.desc": "Personalized feed recommendations based on breed, age, and weight with local market pricing.",
    "home.feature3.title": "Business Insights",
    "home.feature3.desc": "Expert guidance on farm setup, financial planning, and market strategies to grow your business.",
    "home.feature4.title": "Farmer Dashboard",
    "home.feature4.desc": "Track your cattle's health, growth, and expenses with visual insights and historical data.",
    "home.cta.title": "Ready to Transform Your Farm?",
    "home.cta.subtitle": "Join hundreds of farmers using AI to make smarter decisions and increase profitability",
    "home.cta.button": "Get Started Free",
    
    // Cattle Analysis
    "analysis.title": "Cattle Analysis",
    "analysis.subtitle": "Upload a photo to detect breed, estimate weight & age, and check for diseases",
    "analysis.upload.title": "Upload Image",
    "analysis.upload.desc": "Select a clear photo of your cattle",
    "analysis.upload.placeholder": "Drag and drop or click to upload",
    "analysis.upload.choose": "Choose Image",
    "analysis.analyze": "Analyze",
    "analysis.analyzing": "Analyzing...",
    "analysis.results.breed": "Breed Detection",
    "analysis.results.breed.name": "Breed:",
    "analysis.results.breed.confidence": "Confidence:",
    "analysis.results.breed.origin": "Origin:",
    "analysis.results.breed.milk": "Avg. Milk Yield:",
    "analysis.results.weight": "Weight & Age Estimation",
    "analysis.results.weight.label": "Estimated Weight:",
    "analysis.results.weight.range": "Range:",
    "analysis.results.age.label": "Estimated Age:",
    "analysis.results.age.months": "months",
    "analysis.results.health": "Health Status",
    "analysis.results.health.status": "Status:",
    "analysis.results.health.confidence": "Confidence:",
    "analysis.results.empty": "Upload an image and click analyze to see results",
    "analysis.error.invalidFile": "Invalid file type",
    "analysis.error.invalidFileDesc": "Please upload an image file (JPG, PNG)",
    "analysis.error.fileTooLarge": "File too large",
    "analysis.error.fileTooLargeDesc": "Please upload an image smaller than 10MB",
    "analysis.success.title": "Analysis Complete",
    "analysis.success.desc": "Your cattle has been successfully analyzed",
    "analysis.breed.sahiwal": "Sahiwal",
    "analysis.breed.pabna": "Pabna",
    "analysis.breed.redChittagong": "Red Chittagong",
    "analysis.breed.local": "Local",
    "analysis.breed.crossbreed": "Crossbreed",
    "analysis.origin.pakistanIndia": "Pakistan/India",
    "analysis.origin.bangladesh": "Bangladesh",
    "analysis.milkYield.format": "liters/year",
    "analysis.health.healthy": "Healthy",
    "analysis.health.healthy.desc": "No visible signs of disease detected",
    "analysis.health.healthy.action": "Continue regular health monitoring",
    "analysis.range.format.kg": "kg",
    "analysis.range.format.months": "months",
    
    // Nutrition Planner
    "nutrition.title": "Nutrition Planner",
    "nutrition.subtitle": "Get personalized feed recommendations based on breed, age, and weight",
    "nutrition.form.title": "Cattle Information",
    "nutrition.form.desc": "Enter details to generate nutrition plan",
    "nutrition.form.breed": "Breed",
    "nutrition.form.breed.placeholder": "Select breed",
    "nutrition.form.age": "Age (months)",
    "nutrition.form.age.placeholder": "e.g., 36",
    "nutrition.form.weight": "Weight (kg)",
    "nutrition.form.weight.placeholder": "e.g., 450",
    "nutrition.form.generate": "Generate Nutrition Plan",
    "nutrition.form.generating": "Generating Plan...",
    "nutrition.form.error": "Missing Information",
    "nutrition.form.errorDesc": "Please fill in all fields",
    "nutrition.results.title": "Daily Nutritional Requirements",
    "nutrition.results.dryMatter": "Dry Matter:",
    "nutrition.results.protein": "Protein:",
    "nutrition.results.fiber": "Fiber:",
    "nutrition.results.minerals": "Minerals:",
    "nutrition.results.water": "Water:",
    "nutrition.results.feed": "Feed Recommendations",
    "nutrition.results.cost": "Estimated Daily Cost:",
    "nutrition.results.costDesc": "Based on local market prices in Bangladesh",
    "nutrition.results.empty": "Enter cattle details and generate a plan to see recommendations",
    "nutrition.success.title": "Plan Generated",
    "nutrition.success.desc": "Your nutrition plan is ready",
    
    // Business Advisor
    "advisor.title": "AI Business Advisor",
    "advisor.subtitle": "Get expert guidance on farm setup, finances, and market strategies",
    "advisor.chat.title": "Chat with AI Advisor",
    "advisor.chat.desc": "Ask anything about cattle farming business in Bangla or English",
    "advisor.chat.placeholder": "Ask about farm setup, costs, market strategies...",
    "advisor.chat.greeting": "Hello! I'm your AI Business Advisor for cattle farming. I can help you with farm setup, financial planning, market strategies, and more. How can I assist you today?",
    "advisor.chat.error": "Error",
    "advisor.chat.errorDesc": "Failed to get response. Please try again.",
    "advisor.chat.fallback": "I apologize for the inconvenience. As a cattle farming business advisor, I can help with:\n\n• Farm setup and space planning\n• Initial investment and ROI calculations\n• Feed cost optimization\n• Market analysis and selling strategies\n• Breed selection guidance\n• Growth tracking and health management\n\nPlease feel free to ask any specific questions!",
    "advisor.tips.title": "Quick Tips:",
    "advisor.tips.1": "• Ask about budget requirements for different farm sizes",
    "advisor.tips.2": "• Get guidance on ROI and profitability timelines",
    "advisor.tips.3": "• Learn about local market trends and pricing",
    "advisor.tips.4": "• Receive advice on breed selection for your goals",
    
    // Dashboard
    "dashboard.title": "Farmer Dashboard",
    "dashboard.subtitle": "Track your cattle's health, growth, and farm expenses",
    "dashboard.stats.cattle": "Total Cattle",
    "dashboard.stats.weight": "Avg. Weight",
    "dashboard.stats.cost": "Monthly Cost",
    "dashboard.stats.health": "Health Score",
    "dashboard.recent.title": "Recent Analyses",
    "dashboard.recent.desc": "Your latest cattle health check results",
    "dashboard.recent.weight": "Weight",
    "dashboard.recent.health": "Health",
    "dashboard.actions.title": "Quick Actions",
    "dashboard.actions.analysis": "New Analysis",
    "dashboard.actions.nutrition": "Plan Nutrition",
    "dashboard.actions.advice": "Get Advice",
    
    // Auth
    "auth.title": "AgroOx AI",
    "auth.subtitle": "Sign in or create an account to start using our AI-powered cattle farming platform",
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",
    "auth.email": "Email",
    "auth.email.placeholder": "farmer@example.com",
    "auth.password": "Password",
    "auth.password.minLength": "Password must be at least 6 characters",
    "auth.signingIn": "Signing in...",
    "auth.creating": "Creating account...",
    "auth.success": "Success!",
    "auth.successDesc": "Account created successfully. You can now sign in.",
    "auth.welcome": "Welcome back!",
    "auth.welcomeDesc": "Successfully signed in",
    "auth.error": "Error",
    "auth.errorDesc": "Failed to create account",
    "auth.errorSignIn": "Failed to sign in",
    
    // NotFound
    "notfound.title": "404",
    "notfound.message": "Oops! Page not found",
    "notfound.back": "Return to Home",
    
    // Common
    "common.kg": "kg",
    "common.liters": "liters",
    "common.currency": "৳",
  },
  bn: {
    // Navbar
    "nav.home": "হোম",
    "nav.analysis": "গবাদি পশু বিশ্লেষণ",
    "nav.nutrition": "পুষ্টি পরিকল্পনা",
    "nav.advisor": "ব্যবসায়িক পরামর্শদাতা",
    "nav.dashboard": "ড্যাশবোর্ড",
    "nav.getStarted": "শুরু করুন",
    "nav.language": "ভাষা",
    
    // Home Page
    "home.title": "স্মার্ট AI অন্তর্দৃষ্টি দিয়ে আপনার গবাদি পশুর খামার রূপান্তর করুন",
    "home.subtitle": "প্রজাতি সনাক্তকরণ থেকে ব্যবসায়িক পরিকল্পনা পর্যন্ত, AgroOx AI আপনাকে শূন্য থেকে সাফল্যে পথ দেখায়। AI-চালিত বিশ্লেষণ এবং বিশেষজ্ঞ সুপারিশের মাধ্যমে তথ্যপূর্ণ সিদ্ধান্ত নিন।",
    "home.startAnalysis": "বিশ্লেষণ শুরু করুন",
    "home.getAdvice": "ব্যবসায়িক পরামর্শ পান",
    "home.features.title": "সফল হওয়ার জন্য আপনার প্রয়োজনীয় সবকিছু",
    "home.features.subtitle": "ছোট এবং মাঝারি আকারের গবাদি পশু চাষীদের জন্য ডিজাইন করা সম্পূর্ণ AI সরঞ্জাম",
    "home.feature1.title": "AI-চালিত বিশ্লেষণ",
    "home.feature1.desc": "উচ্চ নির্ভুলতার সাথে প্রজাতি সনাক্তকরণ, ওজন অনুমান এবং রোগ নির্ণয়ের জন্য উন্নত AI মডেল।",
    "home.feature2.title": "স্মার্ট পুষ্টি পরিকল্পনা",
    "home.feature2.desc": "প্রজাতি, বয়স এবং ওজনের উপর ভিত্তি করে স্থানীয় বাজার মূল্যের সাথে ব্যক্তিগতকৃত খাদ্য সুপারিশ।",
    "home.feature3.title": "ব্যবসায়িক অন্তর্দৃষ্টি",
    "home.feature3.desc": "খামার সেটআপ, আর্থিক পরিকল্পনা এবং আপনার ব্যবসা বৃদ্ধির জন্য বাজার কৌশলের উপর বিশেষজ্ঞ নির্দেশনা।",
    "home.feature4.title": "কৃষক ড্যাশবোর্ড",
    "home.feature4.desc": "ভিজ্যুয়াল অন্তর্দৃষ্টি এবং ঐতিহাসিক ডেটা সহ আপনার গবাদি পশুর স্বাস্থ্য, বৃদ্ধি এবং ব্যয় ট্র্যাক করুন।",
    "home.cta.title": "আপনার খামার রূপান্তর করতে প্রস্তুত?",
    "home.cta.subtitle": "বুদ্ধিমান সিদ্ধান্ত নিতে এবং লাভজনকতা বাড়াতে AI ব্যবহার করে শত শত কৃষকের সাথে যোগ দিন",
    "home.cta.button": "বিনামূল্যে শুরু করুন",
    
    // Cattle Analysis
    "analysis.title": "গবাদি পশু বিশ্লেষণ",
    "analysis.subtitle": "প্রজাতি সনাক্ত করতে, ওজন ও বয়স অনুমান করতে এবং রোগ পরীক্ষা করতে একটি ফটো আপলোড করুন",
    "analysis.upload.title": "ছবি আপলোড করুন",
    "analysis.upload.desc": "আপনার গবাদি পশুর একটি পরিষ্কার ফটো নির্বাচন করুন",
    "analysis.upload.placeholder": "টেনে এনে ফেলুন বা আপলোড করতে ক্লিক করুন",
    "analysis.upload.choose": "ছবি নির্বাচন করুন",
    "analysis.analyze": "বিশ্লেষণ করুন",
    "analysis.analyzing": "বিশ্লেষণ হচ্ছে...",
    "analysis.results.breed": "প্রজাতি সনাক্তকরণ",
    "analysis.results.breed.name": "প্রজাতি:",
    "analysis.results.breed.confidence": "নির্ভরতা:",
    "analysis.results.breed.origin": "উৎপত্তি:",
    "analysis.results.breed.milk": "গড় দুধ উৎপাদন:",
    "analysis.results.weight": "ওজন ও বয়স অনুমান",
    "analysis.results.weight.label": "অনুমানিত ওজন:",
    "analysis.results.weight.range": "পরিসীমা:",
    "analysis.results.age.label": "অনুমানিত বয়স:",
    "analysis.results.age.months": "মাস",
    "analysis.results.health": "স্বাস্থ্য অবস্থা",
    "analysis.results.health.status": "অবস্থা:",
    "analysis.results.health.confidence": "নির্ভরতা:",
    "analysis.results.empty": "ফলাফল দেখতে একটি ছবি আপলোড করুন এবং বিশ্লেষণে ক্লিক করুন",
    "analysis.error.invalidFile": "অবৈধ ফাইল টাইপ",
    "analysis.error.invalidFileDesc": "অনুগ্রহ করে একটি ছবি ফাইল আপলোড করুন (JPG, PNG)",
    "analysis.error.fileTooLarge": "ফাইল খুব বড়",
    "analysis.error.fileTooLargeDesc": "অনুগ্রহ করে 10MB এর ছোট একটি ছবি আপলোড করুন",
    "analysis.success.title": "বিশ্লেষণ সম্পন্ন",
    "analysis.success.desc": "আপনার গবাদি পশু সফলভাবে বিশ্লেষণ করা হয়েছে",
    "analysis.breed.sahiwal": "সাহিওয়াল",
    "analysis.breed.pabna": "পাবনা",
    "analysis.breed.redChittagong": "লাল চট্টগ্রাম",
    "analysis.breed.local": "স্থানীয়",
    "analysis.breed.crossbreed": "সংকর",
    "analysis.origin.pakistanIndia": "পাকিস্তান/ভারত",
    "analysis.origin.bangladesh": "বাংলাদেশ",
    "analysis.milkYield.format": "লিটার/বছর",
    "analysis.health.healthy": "স্বাস্থ্যবান",
    "analysis.health.healthy.desc": "রোগের কোনো দৃশ্যমান লক্ষণ সনাক্ত করা যায়নি",
    "analysis.health.healthy.action": "নিয়মিত স্বাস্থ্য পর্যবেক্ষণ চালিয়ে যান",
    "analysis.range.format.kg": "কেজি",
    "analysis.range.format.months": "মাস",
    
    // Nutrition Planner
    "nutrition.title": "পুষ্টি পরিকল্পনা",
    "nutrition.subtitle": "প্রজাতি, বয়স এবং ওজনের উপর ভিত্তি করে ব্যক্তিগতকৃত খাদ্য সুপারিশ পান",
    "nutrition.form.title": "গবাদি পশুর তথ্য",
    "nutrition.form.desc": "পুষ্টি পরিকল্পনা তৈরি করতে বিবরণ লিখুন",
    "nutrition.form.breed": "প্রজাতি",
    "nutrition.form.breed.placeholder": "প্রজাতি নির্বাচন করুন",
    "nutrition.form.age": "বয়স (মাস)",
    "nutrition.form.age.placeholder": "যেমন: 36",
    "nutrition.form.weight": "ওজন (কেজি)",
    "nutrition.form.weight.placeholder": "যেমন: 450",
    "nutrition.form.generate": "পুষ্টি পরিকল্পনা তৈরি করুন",
    "nutrition.form.generating": "পরিকল্পনা তৈরি হচ্ছে...",
    "nutrition.form.error": "তথ্য অনুপস্থিত",
    "nutrition.form.errorDesc": "অনুগ্রহ করে সব ক্ষেত্র পূরণ করুন",
    "nutrition.results.title": "দৈনিক পুষ্টির প্রয়োজনীয়তা",
    "nutrition.results.dryMatter": "শুকনো পদার্থ:",
    "nutrition.results.protein": "প্রোটিন:",
    "nutrition.results.fiber": "আঁশ:",
    "nutrition.results.minerals": "খনিজ:",
    "nutrition.results.water": "পানি:",
    "nutrition.results.feed": "খাদ্য সুপারিশ",
    "nutrition.results.cost": "অনুমানিত দৈনিক খরচ:",
    "nutrition.results.costDesc": "বাংলাদেশের স্থানীয় বাজার মূল্যের উপর ভিত্তি করে",
    "nutrition.results.empty": "গবাদি পশুর বিবরণ লিখুন এবং সুপারিশ দেখতে একটি পরিকল্পনা তৈরি করুন",
    "nutrition.success.title": "পরিকল্পনা তৈরি হয়েছে",
    "nutrition.success.desc": "আপনার পুষ্টি পরিকল্পনা প্রস্তুত",
    
    // Business Advisor
    "advisor.title": "AI ব্যবসায়িক পরামর্শদাতা",
    "advisor.subtitle": "খামার সেটআপ, আর্থিক এবং বাজার কৌশলের উপর বিশেষজ্ঞ নির্দেশনা পান",
    "advisor.chat.title": "AI পরামর্শদাতার সাথে চ্যাট করুন",
    "advisor.chat.desc": "গবাদি পশু চাষের ব্যবসা সম্পর্কে বাংলা বা ইংরেজিতে যেকোনো কিছু জিজ্ঞাসা করুন",
    "advisor.chat.placeholder": "খামার সেটআপ, খরচ, বাজার কৌশল সম্পর্কে জিজ্ঞাসা করুন...",
    "advisor.chat.greeting": "হ্যালো! আমি আপনার গবাদি পশু চাষের জন্য AI ব্যবসায়িক পরামর্শদাতা। আমি আপনাকে খামার সেটআপ, আর্থিক পরিকল্পনা, বাজার কৌশল এবং আরও অনেক কিছুতে সাহায্য করতে পারি। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    "advisor.chat.error": "ত্রুটি",
    "advisor.chat.errorDesc": "প্রতিক্রিয়া পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    "advisor.chat.fallback": "অসুবিধার জন্য আমি দুঃখিত। গবাদি পশু চাষের ব্যবসায়িক পরামর্শদাতা হিসেবে, আমি সাহায্য করতে পারি:\n\n• খামার সেটআপ এবং স্থান পরিকল্পনা\n• প্রাথমিক বিনিয়োগ এবং ROI গণনা\n• খাদ্য খরচ অপ্টিমাইজেশন\n• বাজার বিশ্লেষণ এবং বিক্রয় কৌশল\n• প্রজাতি নির্বাচন নির্দেশনা\n• বৃদ্ধি ট্র্যাকিং এবং স্বাস্থ্য ব্যবস্থাপনা\n\nঅনুগ্রহ করে যেকোনো নির্দিষ্ট প্রশ্ন করতে নির্দ্বিধায় করুন!",
    "advisor.tips.title": "দ্রুত টিপস:",
    "advisor.tips.1": "• বিভিন্ন খামারের আকারের জন্য বাজেট প্রয়োজনীয়তা সম্পর্কে জিজ্ঞাসা করুন",
    "advisor.tips.2": "• ROI এবং লাভজনকতা সময়সীমার নির্দেশনা পান",
    "advisor.tips.3": "• স্থানীয় বাজার ট্রেন্ড এবং মূল্য সম্পর্কে জানুন",
    "advisor.tips.4": "• আপনার লক্ষ্যের জন্য প্রজাতি নির্বাচনের পরামর্শ পান",
    
    // Dashboard
    "dashboard.title": "কৃষক ড্যাশবোর্ড",
    "dashboard.subtitle": "আপনার গবাদি পশুর স্বাস্থ্য, বৃদ্ধি এবং খামার ব্যয় ট্র্যাক করুন",
    "dashboard.stats.cattle": "মোট গবাদি পশু",
    "dashboard.stats.weight": "গড় ওজন",
    "dashboard.stats.cost": "মাসিক খরচ",
    "dashboard.stats.health": "স্বাস্থ্য স্কোর",
    "dashboard.recent.title": "সাম্প্রতিক বিশ্লেষণ",
    "dashboard.recent.desc": "আপনার সর্বশেষ গবাদি পশু স্বাস্থ্য পরীক্ষার ফলাফল",
    "dashboard.recent.weight": "ওজন",
    "dashboard.recent.health": "স্বাস্থ্য",
    "dashboard.actions.title": "দ্রুত কার্যক্রম",
    "dashboard.actions.analysis": "নতুন বিশ্লেষণ",
    "dashboard.actions.nutrition": "পুষ্টি পরিকল্পনা",
    "dashboard.actions.advice": "পরামর্শ পান",
    
    // Auth
    "auth.title": "AgroOx AI",
    "auth.subtitle": "আমাদের AI-চালিত গবাদি পশু চাষ প্ল্যাটফর্ম ব্যবহার শুরু করতে সাইন ইন করুন বা একটি অ্যাকাউন্ট তৈরি করুন",
    "auth.signIn": "সাইন ইন",
    "auth.signUp": "সাইন আপ",
    "auth.email": "ইমেইল",
    "auth.email.placeholder": "farmer@example.com",
    "auth.password": "পাসওয়ার্ড",
    "auth.password.minLength": "পাসওয়ার্ড কমপক্ষে 6 অক্ষরের হতে হবে",
    "auth.signingIn": "সাইন ইন করা হচ্ছে...",
    "auth.creating": "অ্যাকাউন্ট তৈরি করা হচ্ছে...",
    "auth.success": "সফল!",
    "auth.successDesc": "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। আপনি এখন সাইন ইন করতে পারেন।",
    "auth.welcome": "আবার স্বাগতম!",
    "auth.welcomeDesc": "সফলভাবে সাইন ইন করা হয়েছে",
    "auth.error": "ত্রুটি",
    "auth.errorDesc": "অ্যাকাউন্ট তৈরি করতে ব্যর্থ",
    "auth.errorSignIn": "সাইন ইন করতে ব্যর্থ",
    
    // NotFound
    "notfound.title": "404",
    "notfound.message": "ওহ! পৃষ্ঠা পাওয়া যায়নি",
    "notfound.back": "হোমে ফিরে যান",
    
    // Common
    "common.kg": "কেজি",
    "common.liters": "লিটার",
    "common.currency": "৳",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("agroox-language");
    return (saved === "bn" || saved === "en" ? saved : "en") as Language;
  });

  useEffect(() => {
    localStorage.setItem("agroox-language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

