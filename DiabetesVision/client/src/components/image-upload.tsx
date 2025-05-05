import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ImageUploadProps {
  onAnalysisComplete: (result: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onAnalysisComplete }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const analysisMutation = useMutation({
    mutationFn: async () => {
      if (!image) throw new Error("No image selected");
      
      // Create form data to upload image
      const formData = new FormData();
      formData.append("image", image);
      
      // Upload to Django backend
      const response = await fetch("/api/api/upload/", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      // Format data from Django to match our frontend expectations
      onAnalysisComplete({
        id: data.id,
        prediction: data.prediction,
        confidence: data.confidence,
        findings: data.findings || [],
        recommendations: data.recommendations || [],
        originalImage: data.original_image || preview,
        processedImage: data.processed_image || preview
      });
    },
    onError: (error) => {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleImageChange = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }
    
    setImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  }, [handleImageChange]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleImageChange(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const analyzeImage = () => {
    if (!image) {
      toast({
        title: "No Image Selected",
        description: "Please upload a fundus image first.",
        variant: "destructive",
      });
      return;
    }
    
    analysisMutation.mutate();
  };

  return (
    <Card className="max-w-3xl mx-auto mb-10 rounded-2xl shadow-xl border-none glass-card overflow-hidden backdrop-blur-md card-3d">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
      <CardContent className="p-8 relative z-10">
        <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Upload Fundus Image</h3>
        
        {!preview ? (
          <div 
            className="border-3 border-dashed border-primary/30 rounded-2xl p-12 text-center cursor-pointer hover:bg-muted/50 transition duration-300 shadow-sm hover:shadow-md"
            onClick={() => document.getElementById("image-upload")?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="bg-primary/10 p-4 rounded-full mx-auto w-24 h-24 flex items-center justify-center mb-6">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <p className="text-foreground/80 text-lg mb-3">Drag and drop your fundus image here</p>
            <p className="text-muted-foreground text-sm mb-6">or</p>
            <Button className="gradient-bg hover:opacity-90 px-8 py-6 rounded-xl text-white font-medium text-base transition-all duration-300 shadow-md hover:shadow-lg">
              <span className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                <span>Select Image</span>
              </span>
            </Button>
            <input 
              type="file" 
              id="image-upload" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileInput}
            />
          </div>
        ) : (
          <div className="mt-8">
            <h4 className="font-semibold text-lg mb-4 text-center">Image Preview</h4>
            <div className="flex justify-center">
              <div className="relative w-80 h-80 shadow-lg rounded-xl overflow-hidden border border-primary/20 card-3d">
                <img 
                  className="w-full h-full object-cover" 
                  src={preview} 
                  alt="Fundus image preview" 
                />
                <button 
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-neutral-100 transition duration-300"
                  onClick={removeImage}
                >
                  <X className="h-5 w-5 text-secondary" />
                </button>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button 
                onClick={analyzeImage}
                disabled={analysisMutation.isPending}
                className="gradient-bg hover:opacity-90 px-10 py-5 rounded-xl text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300"
              >
                {analysisMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : "Analyze Image"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
