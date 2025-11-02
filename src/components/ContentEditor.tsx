import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Edit3, 
  Save, 
  Share, 
  Eye, 
  Lightbulb,
  Zap,
  RefreshCw,
  Download,
  Copy,
  Palette,
  Type,
  AlignLeft
} from 'lucide-react';

const suggestions = [
  "Add more engaging opening",
  "Include relevant statistics", 
  "Strengthen the conclusion",
  "Add call-to-action",
  "Improve readability",
  "Include examples"
];

const ContentEditor = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [content, setContent] = useState(`# Welcome to AI Content Editor

This is where your creative journey begins. Our intelligent editor provides real-time suggestions to enhance your content.

## Key Features:
- **Smart Suggestions**: AI-powered recommendations to improve your writing
- **Real-time Preview**: See how your content looks as you write
- **Export Options**: Download in multiple formats
- **Collaboration**: Share and collaborate with your team

Start writing and watch the magic happen!`);
  
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(content.split(' ').length);

  const handleContentChange = (value: string) => {
    setContent(value);
    setWordCount(value.split(' ').filter(word => word.length > 0).length);
  };

  const handleSuggestionApply = (suggestion: string) => {
    // Simulate applying suggestion
    console.log('Applying suggestion:', suggestion);
  };

  return (
    <section ref={elementRef} className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-sm font-medium mb-6">
            <Edit3 className="w-4 h-4 mr-2" />
            Smart Content Editor
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Edit with AI Assistance
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Enhance your content with intelligent suggestions and real-time feedback
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Editor Toolbar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  Editor Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Format Buttons */}
                <div className="space-y-2">
                  <p className="text-sm text-white/70 font-medium">Format</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                      <Type className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Actions */}
                <div className="space-y-2">
                  <Button 
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isPreviewMode ? 'Edit' : 'Preview'}
                  </Button>
                  
                  <Button variant="outline" className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  
                  <Button variant="outline" className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  
                  <Button variant="outline" className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                <Separator className="bg-white/10" />

                {/* Stats */}
                <div className="space-y-2">
                  <p className="text-sm text-white/70 font-medium">Statistics</p>
                  <div className="text-sm text-white/60">
                    <p>Words: {wordCount}</p>
                    <p>Characters: {content.length}</p>
                    <p>Reading time: {Math.ceil(wordCount / 200)} min</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Editor */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-green-400" />
                    Content Editor
                  </span>
                  <Badge variant="outline" className="border-white/30 text-white/70">
                    {isPreviewMode ? 'Preview Mode' : 'Edit Mode'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPreviewMode ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-invert max-w-none min-h-[500px] p-4 bg-white/5 rounded-lg"
                    dangerouslySetInnerHTML={{ 
                      __html: content
                        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
                        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
                        .replace(/^\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                        .replace(/\n/g, '<br>')
                    }}
                  />
                ) : (
                  <Textarea
                    value={content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="min-h-[500px] bg-white/5 border-white/20 text-white resize-none font-mono"
                    placeholder="Start writing your amazing content here..."
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-white/70">
                  AI-powered suggestions to improve your content
                </p>
                
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors cursor-pointer group"
                      onClick={() => handleSuggestionApply(suggestion)}
                    >
                      <div className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-white/80 group-hover:text-white transition-colors">
                          {suggestion}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Suggestions
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContentEditor;