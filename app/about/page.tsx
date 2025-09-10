// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import Navigation from '@/components/Navigation';
// import SocialMedia from '@/components/SocialMedia';
// import Footer from '@/components/Footer';
// import { Users, Award, Target, Heart } from 'lucide-react';

// interface TeamMember {
//   id: string;
//   name: string;
//   position: string;
//   bio?: string;
//   image_url: string;
//   active: boolean;
// }
// const values = [
//   {
//     icon: Target,
//     title: 'Innovation',
//     description: 'We push the boundaries of architectural design with cutting-edge solutions.'
//   },
//   {
//     icon: Heart,
//     title: 'Sustainability',
//     description: 'Environmental responsibility is at the core of every project we undertake.'
//   },
//   {
//     icon: Users,
//     title: 'Collaboration',
//     description: 'We work closely with clients to bring their vision to life through partnership.'
//   },
//   {
//     icon: Award,
//     title: 'Excellence',
//     description: 'Quality and attention to detail define every aspect of our work.'
//   }
// ];

// export default function About() {
//   const sectionsRef = useRef<HTMLDivElement>(null);
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadTeamMembers();
//   }, []);

//   const loadTeamMembers = async () => {
//     try {
//       const response = await fetch('/api/team-members');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const teamData = await response.json();
      
//       if (Array.isArray(teamData)) {
//         setTeamMembers(teamData);
//       } else {
//         setTeamMembers([]);
//       }
//     } catch (error) {
//       console.error('Error loading team members:', error);
//       setTeamMembers([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const elements = sectionsRef.current?.querySelectorAll('.fade-in, .slide-up');
//     elements?.forEach((element) => observer.observe(element));

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       <Navigation />
//       <main className="pt-24" ref={sectionsRef}>
//         {/* Hero Section */}
//         <section className="py-20 bg-gradient-to-b from-black to-gray-900">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide fade-in text-yellow-400">
//                 About 26AS
//               </h1>
//               <p className="text-xl text-gray-300 max-w-3xl mx-auto fade-in">
//                 We are a forward-thinking architecture studio dedicated to creating spaces that inspire, function beautifully, and stand the test of time.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Story Section */}
//         <section className="py-20 bg-black">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//               <div className="fade-in">
//                 <h2 className="text-4xl font-light mb-6 tracking-wide text-yellow-400">
//                   Our Story
//                 </h2>
//                 <p className="text-gray-300 text-lg leading-relaxed mb-6">
//                   Founded in 2012, 26AS Design Studio emerged from a shared vision to revolutionize architectural design through innovative thinking and sustainable practices. Our journey began with a simple belief: that great architecture has the power to transform lives and communities.
//                 </p>
//                 <p className="text-gray-300 text-lg leading-relaxed">
//                   Over the years, we've grown from a small team of passionate architects to a comprehensive design studio, working on projects ranging from intimate residential spaces to large-scale commercial developments.
//                 </p>
//               </div>
//               <div className="fade-in">
//                 <img
//                   src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
//                   alt="Our team at work"
//                   className="w-full h-96 object-cover rounded-lg shadow-lg"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Values Section */}
//         <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl font-light mb-6 tracking-wide slide-up text-yellow-400">
//                 Our Values
//               </h2>
//               <p className="text-gray-300 text-lg max-w-2xl mx-auto slide-up">
//                 These core principles guide every decision we make and every project we undertake.
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {values.map((value, index) => (
//                 <div
//                   key={index}
//                   className="text-center fade-in"
//                   style={{ transitionDelay: `${index * 0.1}s` }}
//                 >
//                   <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <value.icon className="w-8 h-8 text-black" />
//                   </div>
//                   <h3 className="text-xl font-medium mb-3 text-white">{value.title}</h3>
//                   <p className="text-gray-300 text-sm leading-relaxed">
//                     {value.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Team Section */}
//         <section className="py-20 bg-black">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl font-light mb-6 tracking-wide slide-up text-yellow-400">
//                 Meet Our Team
//               </h2>
//               <p className="text-gray-300 text-lg max-w-2xl mx-auto slide-up">
//                 Our diverse team of architects, designers, and engineers brings together decades of experience and fresh perspectives.
//               </p>
//             </div>
//             {loading ? (
//               <div className="text-center text-yellow-400 text-xl">Loading team members...</div>
//             ) : teamMembers.length === 0 ? (
//               <div className="text-center">
//                 <div className="text-gray-400 text-xl mb-4">No team members available</div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {teamMembers.map((member, index) => (
//                   <div
//                     key={member.id}
//                     className="text-center fade-in bg-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300"
//                     style={{ transitionDelay: `${index * 0.1}s` }}
//                   >
//                     <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-yellow-400/50 hover:border-yellow-400 transition-all duration-300 relative group">
//                       {member.image_url && member.image_url !== '' ? (
//                         <img
//                           src={member.image_url}
//                           alt={member.name}
//                           className="w-full h-full object-cover rounded-full"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <span className="text-yellow-400 text-xl font-bold">
//                           {member.name.split(' ').map(n => n.charAt(0)).join('')}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     <h3 className="text-lg font-medium mb-2 text-white">{member.name}</h3>
//                     <p className="text-yellow-400 font-medium mb-3">{member.position}</p>
//                     {member.bio && (
//                       <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//       <SocialMedia />
//       <Footer />
//     </>
//   );
// }

'use client';

import { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import SocialMedia from '@/components/SocialMedia';
import Footer from '@/components/Footer';
import { Users, Award, Target, Heart } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  image_url: string;
  active: boolean;
}
const values = [
  {
    icon: Target,
    title: 'Innovation',
    description: 'We push the boundaries of architectural design with cutting-edge solutions.'
  },
  {
    icon: Heart,
    title: 'Sustainability',
    description: 'Environmental responsibility is at the core of every project we undertake.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with clients to bring their vision to life through partnership.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Quality and attention to detail define every aspect of our work.'
  }
];

export default function About() {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      console.log('🔍 Loading team members from API...');
      const response = await fetch('/api/team-members');
      
      console.log('🔍 Team members API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const teamData = await response.json();
      console.log('🔍 Team members data received from API:', teamData);
      
      if (Array.isArray(teamData)) {
        console.log('🔍 Setting team members from API data, count:', teamData.length);
        setTeamMembers(teamData);
      } else {
        console.warn('🔍 Invalid team members data structure:', teamData);
        setTeamMembers([]);
      }
    } catch (error) {
      console.error('Error loading team members:', error);
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionsRef.current?.querySelectorAll('.fade-in, .slide-up');
    elements?.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <main className="pt-24" ref={sectionsRef}>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide fade-in text-yellow-400">
                About 26AS
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto fade-in">
                We are a forward-thinking architecture studio dedicated to creating spaces that inspire, function beautifully, and stand the test of time.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="fade-in">
                <h2 className="text-4xl font-light mb-6 tracking-wide text-yellow-400">
                  Our Story
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Founded in 2012, 26AS Design Studio emerged from a shared vision to revolutionize architectural design through innovative thinking and sustainable practices. Our journey began with a simple belief: that great architecture has the power to transform lives and communities.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Over the years, we've grown from a small team of passionate architects to a comprehensive design studio, working on projects ranging from intimate residential spaces to large-scale commercial developments.
                </p>
              </div>
              <div className="fade-in">
                <img
                  src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
                  alt="Our team at work"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-6 tracking-wide slide-up text-yellow-400">
                Our Values
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto slide-up">
                These core principles guide every decision we make and every project we undertake.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center fade-in"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-6 tracking-wide slide-up text-yellow-400">
                Meet Our Team
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto slide-up">
                Our diverse team of architects, designers, and engineers brings together decades of experience and fresh perspectives.
              </p>
            </div>
            {loading ? (
              <div className="text-center text-yellow-400 text-xl">Loading team members...</div>
            ) : teamMembers.length === 0 ? (
              <div className="text-center">
                <div className="text-gray-400 text-xl mb-4">
                  No team members available
                  <div className="text-sm mt-2">
                    Loading: {loading ? 'Yes' : 'No'} | 
                    Count: {teamMembers.length} | 
                    API Status: Check console
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="text-center fade-in bg-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-yellow-400/50 hover:border-yellow-400 transition-all duration-300 relative group">
                      {member.image_url && member.image_url !== '' ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            console.log('🔍 Image failed to load:', member.image_url);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-yellow-400 text-xl font-bold">
                            {member.name.split(' ').map(n => n.charAt(0)).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">{member.name}</h3>
                    <p className="text-yellow-400 font-medium mb-3">{member.position}</p>
                    {member.bio && (
                      <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      ID: {member.id} | Active: {member.active ? 'Yes' : 'No'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SocialMedia />
      <Footer />
    </>
  );
}