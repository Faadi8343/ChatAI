import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  PenTool, 
  MessageSquare, 
  Image, 
  Mail, 
  Lightbulb, 
  Rocket,
  Sparkles,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: PenTool,
    title: 'Blog Content',
    description: 'Generate engaging blog posts with AI-powered creativity and SEO optimization.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.1
  },
  {
    icon: MessageSquare,
    title: 'Social Media',
    description: 'Create viral social media content that resonates with your audience.',
    color: 'from-blue-500 to-cyan-500',
    delay: 0.2
  },
  {
    icon: Mail,
    title: 'Email Campaigns',
    description: 'Craft compelling email content that drives engagement and conversions.',
    color: 'from-green-500 to-emerald-500',
    delay: 0.3
  },
  {
    icon: Lightbulb,
    title: 'Creative Writing',
    description: 'Unleash your creativity with AI-assisted storytelling and creative content.',
    color: 'from-yellow-500 to-orange-500',
    delay: 0.4
  }
];

const stats = [
  { number: '10K+', label: 'Content Pieces Generated', icon: Rocket },
  { number: '99%', label: 'User Satisfaction', icon: Sparkles },
  { number: '5x', label: 'Faster Content Creation', icon: Zap },
  { number: '24/7', label: 'AI Availability', icon: PenTool }
];

const FeatureShowcase = () => {
  const { elementRef: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation();

  return (
    <section className="py-24 px-6 relative">
      {/* Features Grid */}
      <div ref={featuresRef} className="max-w-6xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={featuresVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful AI Features
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover the cutting-edge capabilities that make our platform the ultimate content creation tool
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <Card className="group bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 h-full cursor-pointer">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      className={`h-1 bg-gradient-to-r ${feature.color} mt-4 rounded-full transition-all duration-300`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={statsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 text-sm font-medium mb-6">
            Trusted by Creators Worldwide
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={statsVisible ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: 'spring' }}
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                >
                  {stat.number}
                </motion.div>
                
                <p className="text-white/70 text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;