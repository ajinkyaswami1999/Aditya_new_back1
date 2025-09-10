// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { supabaseClient } from '@/lib/supabase-client';


// export default function StatsSection() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [stats, setStats] = useState([
//     { number: 150, label: 'Projects Completed', suffix: '+' },
//     { number: 12, label: 'Years Experience', suffix: '' },
//     { number: 200, label: 'Happy Clients', suffix: '+' },
//     { number: 95, label: 'Success Rate', suffix: '%' }
//   ]);
//   const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
//   const sectionRef = useRef<HTMLDivElement>(null);

//   // Load stats from database
//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       // Try to load from Supabase first
//       if (supabaseClient) {
//         const { data, error } = await supabaseClient
//           .from('site_settings')
//           .select('value')
//           .eq('key', 'stats')
//           .single();
        
//         if (!error && data?.value) {
//           const statsData = JSON.parse(data.value);
//           const updatedStats = [
//             { number: statsData.projectsCompleted, label: 'Projects Completed', suffix: '+' },
//             { number: statsData.yearsExperience, label: 'Years Experience', suffix: '' },
//             { number: statsData.happyClients, label: 'Happy Clients', suffix: '+' },
//             { number: statsData.successRate, label: 'Success Rate', suffix: '%' }
//           ];
//           setStats(updatedStats);
//           setAnimatedStats(updatedStats.map(() => 0));
//           return;
//         }
//       }
      
//       // Fallback to API route
//       const response = await fetch('/api/site-settings/stats');
//       if (response.ok) {
//         const statsData = await response.json();
//         const updatedStats = [
//           { number: statsData.projectsCompleted, label: 'Projects Completed', suffix: '+' },
//           { number: statsData.yearsExperience, label: 'Years Experience', suffix: '' },
//           { number: statsData.happyClients, label: 'Happy Clients', suffix: '+' },
//           { number: statsData.successRate, label: 'Success Rate', suffix: '%' }
//         ];
//         setStats(updatedStats);
//         setAnimatedStats(updatedStats.map(() => 0));
//       }
//     } catch (error) {
//       console.error('Error loading stats:', error);
//       // Keep default stats on error
//     }
//   };
  
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !isVisible) {
//           setIsVisible(true);
          
//           // Animate numbers
//           stats.forEach((stat, index) => {
//             let start = 0;
//             const end = stat.number;
//             const duration = 2000;
//             const increment = end / (duration / 16);
            
//             const timer = setInterval(() => {
//               start += increment;
//               if (start >= end) {
//                 start = end;
//                 clearInterval(timer);
//               }
              
//               setAnimatedStats(prev => {
//                 const newStats = [...prev];
//                 newStats[index] = Math.floor(start);
//                 return newStats;
//               });
//             }, 16);
//           });
//         }
//       },
//       { threshold: 0.5 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, [isVisible]);

//   return (
//     <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center">
//               <div className={`text-4xl md:text-5xl font-light mb-2 counter-animated text-yellow-400 ${isVisible ? 'visible' : ''}`}>
//                 {animatedStats[index]}{stat.suffix}
//               </div>
//               <div className="text-gray-300 font-medium tracking-wide">
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useEffect, useState, useRef } from 'react';
import { supabaseClient } from '@/lib/supabase-client';


export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState([
    { number: 150, label: 'Projects Completed', suffix: '+' },
    { number: 12, label: 'Years Experience', suffix: '' },
    { number: 200, label: 'Happy Clients', suffix: '+' },
    { number: 95, label: 'Success Rate', suffix: '%' }
  ]);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  // Load stats from database
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      console.log('🔍 Loading stats from API...');
      // Load from API route (which handles Supabase connection)
      const response = await fetch('/api/site-settings/stats');
      console.log('🔍 Stats API response status:', response.status);
      
      if (response.ok) {
        const statsData = await response.json();
        console.log('🔍 Stats data received from API:', statsData);
        
        // Ensure we have valid numbers
        const safeStats = {
          projectsCompleted: Number(statsData.projectsCompleted) || 150,
          yearsExperience: Number(statsData.yearsExperience) || 12,
          happyClients: Number(statsData.happyClients) || 200,
          successRate: Number(statsData.successRate) || 95
        };
        
        const updatedStats = [
          { number: safeStats.projectsCompleted, label: 'Projects Completed', suffix: '+' },
          { number: safeStats.yearsExperience, label: 'Years Experience', suffix: '' },
          { number: safeStats.happyClients, label: 'Happy Clients', suffix: '+' },
          { number: safeStats.successRate, label: 'Success Rate', suffix: '%' }
        ];
        console.log('🔍 Updated stats array:', updatedStats);
        setStats(updatedStats);
        setAnimatedStats(updatedStats.map(() => 0));
      } else {
        console.error('Failed to load stats from API:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('API Error response:', errorText);
        // Keep default stats on API error
      }
    } catch (error) {
      console.log('🔍 Stats API error:', error);
      console.error('Error loading stats:', error);
      // Keep default stats on error
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          // Animate numbers
          stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.number;
            const duration = 2000;
            const increment = end / (duration / 16);
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              
              setAnimatedStats(prev => {
                const newStats = [...prev];
                newStats[index] = Math.floor(start);
                return newStats;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-light mb-2 counter-animated text-yellow-400 ${isVisible ? 'visible' : ''}`}>
                {animatedStats[index]}{stat.suffix}
              </div>
              <div className="text-gray-300 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}