import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { generateContent, getContentSuggestions, ContentRequest, GeneratedContent } from '@/lib/aiService';
import { 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw, 
  Wand2,
  Clock,
  FileText,
  MessageSquare,
  Mail,
  PenTool
} from 'lucide-react';

const contentTypes = [
  { value: 'blog', label: 'Blog Post', icon: FileText, color: 'from-purple-500 to-pink-500' },
  { value: 'social', label: 'Social Media', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
  { value: 'email', label: 'Email', icon: Mail, color: 'from-green-500 to-emerald-500' },
  { value: 'creative', label: 'Creative Writing', icon: PenTool, color: 'from-yellow-500 to-orange-500' }
] as const;

const tones = ['professional', 'casual', 'creative', 'formal'] as const;
const lengths = ['short', 'medium', 'long'] as const;

type ContentType = typeof contentTypes[number]['value'];
type ToneType = typeof tones[number];
type LengthType = typeof lengths[number];

const AIContentGenerator = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [request, setRequest] = useState<Partial<ContentRequest>>({
    type: 'blog',
    tone: 'professional',
    length: 'medium'
  });
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [suggestions] = useState(getContentSuggestions('blog'));

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    try {
      const content = await generateContent({
        ...request as ContentRequest,
        topic
      });
      setGeneratedContent(content);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTopic(suggestion);
  };

  const selectedType = contentTypes.find(type => type.value === request.type);

  return (
    <section ref={elementRef} className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 text-sm font-medium mb-6">
            <Wand2 className="w-4 h-4 mr-2" />
            AI Content Generator
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Create Content in Seconds
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Transform your ideas into professional content with our advanced AI technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generator Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Content Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Type Selection */}
                <div className="space-y-3">
                  <Label className="text-white/90">Content Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {contentTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <motion.div
                          key={type.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={request.type === type.value ? "default" : "outline"}
                            onClick={() => setRequest({ ...request, type: type.value as ContentType })}
                            className={`w-full h-auto p-4 flex flex-col items-center gap-2 ${
                              request.type === type.value 
                                ? `bg-gradient-to-r ${type.color} text-white border-0` 
                                : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{type.label}</span>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Topic Input */}
                <div className="space-y-3">
                  <Label className="text-white/90">Topic</Label>
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your content topic..."
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                  
                  {/* Suggestions */}
                  <div className="flex flex-wrap gap-2">
                    {suggestions.slice(0, 3).map((suggestion) => (
                      <Badge
                        key={suggestion}
                        variant="outline"
                        className="cursor-pointer border-white/30 text-white/70 hover:bg-white/10 transition-colors"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tone and Length */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/90">Tone</Label>
                    <Select value={request.tone} onValueChange={(value: ToneType) => setRequest({ ...request, tone: value })}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((tone) => (
                          <SelectItem key={tone} value={tone}>
                            {tone.charAt(0).toUpperCase() + tone.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/90">Length</Label>
                    <Select value={request.length} onValueChange={(value: LengthType) => setRequest({ ...request, length: value })}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {lengths.map((length) => (
                          <SelectItem key={length} value={length}>
                            {length.charAt(0).toUpperCase() + length.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!topic.trim() || isGenerating}
                  className={`w-full bg-gradient-to-r ${selectedType?.color} text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generated Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    Generated Content
                  </span>
                  {generatedContent && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopy}
                        className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-64 text-white/60"
                    >
                      <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                      <p>AI is crafting your content...</p>
                    </motion.div>
                  ) : generatedContent ? (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">{generatedContent.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Clock className="w-4 h-4" />
                          {generatedContent.wordCount} words
                        </div>
                      </div>
                      
                      <Textarea
                        value={generatedContent.content}
                        readOnly
                        className="min-h-[300px] bg-white/5 border-white/20 text-white resize-none"
                      />
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-white/30 text-white/70">
                          {generatedContent.type}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white/70">
                          {new Date(generatedContent.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-64 text-white/40"
                    >
                      <Wand2 className="w-12 h-12 mb-4" />
                      <p className="text-center">Your generated content will appear here</p>
                      <p className="text-sm text-center mt-2">Fill in the form and click generate to get started</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIContentGenerator;