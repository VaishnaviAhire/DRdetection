import { useState } from "react";
import ImageUpload from "@/components/image-upload";
import AnalysisResult from "@/components/analysis-result";
import FeedbackForm from "@/components/feedback-form";

const Home = () => {
  const [currentView, setCurrentView] = useState<
    "upload" | "result" | "feedback"
  >("upload");
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    setCurrentView("result");
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setCurrentView("upload");
  };

  const handleProvideFeedback = () => {
    setCurrentView("feedback");
  };

  const handleFeedbackSubmitted = () => {
    handleNewAnalysis();
  };

  return (
    <section className="relative bg-gray-50 min-h-screen">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none"></div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="text-center mb-16 relative z-10">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 left-1/3 transform -translate-x-1/2 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6 tracking-tight">
            Diabetic Retinopathy Detection
          </h2>

          <div className="relative w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8">
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse delay-700"></div>
          </div>

          <p className="text-neutral-700 max-w-2xl mx-auto text-lg leading-relaxed">
            Upload a fundus image to detect early signs of diabetic retinopathy
            using our
            <span className="font-semibold text-primary">
              {" "}
              advanced AI technology
            </span>
            . Early detection saves sight.
          </p>
        </div>

        <div className="bg-white/90 shadow-lg rounded-xl p-6 relative z-10">
          {currentView === "upload" && (
            <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
          )}

          {currentView === "result" && analysisResult && (
            <AnalysisResult
              result={analysisResult}
              onNewAnalysis={handleNewAnalysis}
              onProvideFeedback={handleProvideFeedback}
            />
          )}

          {currentView === "feedback" && analysisResult && (
            <FeedbackForm
              onFeedbackSubmitted={handleFeedbackSubmitted}
              analysisId={analysisResult.id}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
