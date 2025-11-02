import React, { useRef } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import HeroSection from '@/components/HeroSection';
import FeatureShowcase from '@/components/FeatureShowcase';
import AIContentGenerator from '@/components/AIContentGenerator';
import ContentEditor from '@/components/ContentEditor';

const Index: React.FC = () => {
  const aiGeneratorRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    aiGeneratorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatedBackground />
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <FeatureShowcase />
        <div ref={aiGeneratorRef}>
          <AIContentGenerator />
        </div>
        <ContentEditor />
      </main>
    </>
  );
};

export default Index;
