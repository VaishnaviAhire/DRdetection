import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface AnalysisResultProps {
  result: {
    id: number;
    prediction: string;
    confidence: number;
    findings: string[];
    recommendations: string[];
    originalImage: string;
    processedImage: string;
  };
  onNewAnalysis: () => void;
  onProvideFeedback: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ 
  result, 
  onNewAnalysis, 
  onProvideFeedback 
}) => {
  return (
    <Card className="max-w-4xl mx-auto mb-10 rounded-2xl shadow-xl border-none glass-card overflow-hidden backdrop-blur-md card-3d">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-accent/3 to-secondary/5 z-0"></div>
      <CardContent className="p-8 relative z-10">
        <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Analysis Result</h3>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground/90">Original Image</h4>
            <div className="border border-primary/20 rounded-xl overflow-hidden h-72 bg-muted/30 shadow-lg flex items-center justify-center card-3d relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
              <img 
                className="max-w-full max-h-full object-contain relative z-10" 
                src={result.originalImage} 
                alt="Original fundus image" 
              />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">Processed Image</h4>
            <div className="border-2 border-primary/20 rounded-xl overflow-hidden h-72 bg-muted shadow-md flex items-center justify-center">
              <img 
                className="max-w-full max-h-full object-contain" 
                src={result.processedImage || result.originalImage} 
                alt="Processed fundus image" 
              />
            </div>
          </div>
        </div>
        
        <div className="glass-card backdrop-blur-sm border-l-4 border-secondary p-6 rounded-xl mb-8 flex items-start shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-mesh pointer-events-none"></div>
          <div className="flex-grow relative z-10">
            <h4 className="font-bold text-xl text-accent mb-3">Prediction: <span className="gradient-text">{result.prediction}</span></h4>
            <div className="flex items-center gap-3">
              <div className="h-4 w-full bg-muted/70 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-accent to-secondary" 
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
              <p className="text-foreground font-semibold whitespace-nowrap">{result.confidence}% Confidence</p>
            </div>
          </div>
          <div className="text-accent text-2xl ml-4 relative z-10">
            <AlertTriangle className="h-9 w-9 drop-shadow-md" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6 rounded-xl shadow-md border border-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-mesh pointer-events-none"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <h4 className="font-semibold text-lg mb-6 flex items-center relative z-10">
              <div className="w-1.5 h-10 bg-gradient-to-b from-primary to-primary/40 rounded-full mr-3"></div>
              <span className="text-primary/90 drop-shadow-sm">Findings</span>
            </h4>
            <ul className="space-y-4 text-foreground relative z-10">
              {result.findings.map((finding, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 border border-primary/30 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-foreground/90">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="glass-card p-6 rounded-xl shadow-md border border-accent/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-mesh pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
            <h4 className="font-semibold text-lg mb-6 flex items-center relative z-10">
              <div className="w-1.5 h-10 bg-gradient-to-b from-accent to-accent/40 rounded-full mr-3"></div>
              <span className="text-accent/90 drop-shadow-sm">Recommendations</span>
            </h4>
            <ul className="space-y-4 text-foreground relative z-10">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 border border-accent/30 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <span className="text-foreground/90">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
          <Button 
            variant="outline" 
            onClick={onNewAnalysis}
            className="border-2 border-primary px-8 py-5 rounded-xl font-medium text-base shadow-sm hover:shadow-md transition-all duration-300 hover:bg-primary/5"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                <path d="M16 21h5v-5"></path>
              </svg>
              <span>New Analysis</span>
            </span>
          </Button>
          <Button 
            onClick={onProvideFeedback}
            className="gradient-bg hover:opacity-90 px-8 py-5 rounded-xl text-white font-medium text-base shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span>Provide Feedback</span>
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResult;
