import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface FeedbackFormProps {
  onFeedbackSubmitted: () => void;
  analysisId?: number;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  onFeedbackSubmitted,
  analysisId = 1, // Default to 1 for demo if not provided
}) => {
  const [accuracy, setAccuracy] = useState("accurate");
  const [comments, setComments] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Map frontend values to Django model choices
  const accuracyMapping = {
    "yes": "accurate",
    "partially": "partially_accurate",
    "no": "inaccurate",
    "unsure": "unsure",
  };

  const feedbackMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accuracy: accuracy,
          comments: comments.trim() || null,
          analysis: analysisId,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Feedback submission failed: ${response.statusText}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate any queries that might have included this analysis result
      queryClient.invalidateQueries({ queryKey: ["/api/analysis-results", analysisId] });
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
      onFeedbackSubmitted();
    },
    onError: (error) => {
      console.error("Feedback error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    feedbackMutation.mutate();
  };

  return (
    <Card className="max-w-3xl mx-auto mb-10 rounded-2xl shadow-lg border-primary/10 overflow-hidden">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Your Feedback</h3>
        
        <div className="bg-muted/50 p-6 rounded-xl shadow-sm mb-8">
          <Label htmlFor="accuracy" className="block font-semibold text-lg text-foreground mb-4">
            Was this prediction accurate in your opinion?
          </Label>
          <Select 
            value={accuracy}
            onValueChange={setAccuracy}
          >
            <SelectTrigger id="accuracy" className="w-full border-2 border-primary/20 rounded-xl py-6 bg-white shadow-sm focus:ring-primary">
              <SelectValue placeholder="Select accuracy" />
            </SelectTrigger>
            <SelectContent className="border-primary/20 rounded-xl overflow-hidden">
              <SelectItem value="accurate" className="py-3 focus:bg-primary/10 focus:text-primary">Yes, it was accurate</SelectItem>
              <SelectItem value="partially_accurate" className="py-3 focus:bg-primary/10 focus:text-primary">Partially accurate</SelectItem>
              <SelectItem value="inaccurate" className="py-3 focus:bg-primary/10 focus:text-primary">No, it was inaccurate</SelectItem>
              <SelectItem value="unsure" className="py-3 focus:bg-primary/10 focus:text-primary">I'm not sure</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="bg-muted/50 p-6 rounded-xl shadow-sm mb-8">
          <Label htmlFor="comments" className="block font-semibold text-lg text-foreground mb-4">
            Additional comments (optional):
          </Label>
          <Textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-4 border-2 border-primary/20 rounded-xl h-40 bg-white focus:ring-primary focus:border-primary"
            placeholder="Please share any additional thoughts or observations about the analysis..."
          />
        </div>
        
        <div className="text-center">
          <Button 
            className="bg-primary hover:bg-primary/90 px-8 py-5 rounded-xl text-white font-medium text-base shadow-md hover:shadow-lg transition-all duration-300"
            onClick={handleSubmit}
            disabled={feedbackMutation.isPending}
          >
            {feedbackMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Submitting...</span>
              </div>
            ) : "Submit Feedback"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
