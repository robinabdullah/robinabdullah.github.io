'use client';

import { useEffect, useRef } from 'react';

export default function GradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get all circle elements
    const circles = containerRef.current.querySelectorAll('div[class*="rounded-full"]');
    
    // Animation parameters for different movement patterns
    const animations = [
      { xAmplitude: 100, yAmplitude: 100, xPhase: 0, yPhase: 0 },
      { xAmplitude: 120, yAmplitude: -60, xPhase: 0.5, yPhase: 0.2 },
      { xAmplitude: -100, yAmplitude: 70, xPhase: 0.3, yPhase: 0.7 },
      { xAmplitude: 160, yAmplitude: -80, xPhase: 0.1, yPhase: 0.4 },
      { xAmplitude: 180, yAmplitude: 90, xPhase: 0.8, yPhase: 0.1 },
      { xAmplitude: -150, yAmplitude: -100, xPhase: 0.6, yPhase: 0.3 }
    ];
    
    // Base positions (center of viewport)
    const baseX = window.innerWidth / 2;
    const baseY = window.innerHeight / 2;
    
    let animationFrameId: number;
    
    // Animation function
    const animate = () => {
      // Current time for the animation
      const time = Date.now() / 5000; // Slow movement - 20 second cycle
      
      // Update each circle's position
      circles.forEach((circle, index) => {
        if (index >= animations.length) return;
        
        // Get animation parameters for this circle
        const { xAmplitude, yAmplitude, xPhase, yPhase } = animations[index];
        
        // Calculate position with sinusoidal movement
        const x = Math.sin(time * 2 * Math.PI + xPhase * Math.PI * 2) * xAmplitude;
        const y = Math.cos(time * 2 * Math.PI + yPhase * Math.PI * 2) * yAmplitude;
        
        // Apply the transformation with matrix for smooth animation
        (circle as HTMLElement).style.transform = `matrix(1, 0, 0, 1, ${x}, ${y})`;
        
        // Scale factor (breathing effect)
        const scale = 1 + Math.sin(time * 4 * Math.PI + index * 0.2) * 0.1;
        
        // Apply the scale effect - this ensures we keep both effects
        (circle as HTMLElement).style.transform = `matrix(${scale}, 0, 0, ${scale}, ${x}, ${y})`;
      });
      
      // Continue the animation loop
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animate();
    
    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Animated gradient background - center of the screen */}
      <div 
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none flex justify-center items-center filter blur-[100px] opacity-50"
      >
        <div className="bg-yellow-500 w-[350px] h-[250px] rounded-full absolute"></div>
        <div className="bg-green-500 w-[360px] h-[260px] rounded-full absolute"></div>
        <div className="bg-orange-500 w-[370px] h-[270px] rounded-full absolute"></div>
        <div className="bg-purple-500 w-[380px] h-[280px] rounded-full absolute"></div>
        <div className="bg-blue-500 w-[390px] h-[290px] rounded-full absolute"></div>
        <div className="bg-pink-500 w-[400px] h-[300px] rounded-full absolute"></div>
      </div>
      
      {/* Static background bubbles on sides */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0">
          {/* Top left bubble */}
          <div 
            className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-15" 
            style={{ transform: 'translateY(0px)' }}
          ></div>
          
          {/* Top right bubble */}
          <div 
            className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-15 hidden sm:block" 
            style={{ transform: 'translateY(42.0735px)' }}
          ></div>
          
          {/* Bottom left bubble */}
          <div 
            className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-15" 
            style={{ transform: 'translateY(45.4649px)' }}
          ></div>
          
          {/* Bottom right bubble */}
          <div 
            className="absolute -bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-15 hidden sm:block" 
            style={{ transform: 'translateY(7.056px)' }}
          ></div>
        </div>
      </div>
      
      {/* Dark background color */}
      <div className="fixed inset-0 -z-30 bg-[#030014]"></div>
    </>
  );
}
