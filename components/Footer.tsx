'use client';

import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { supabaseClient } from '@/lib/supabase-client';

export default function Footer() {
  const [contactInfo, setContactInfo] = useState({
    address: 'E-35 Karni Nagar, Lalgarh, Bikaner, 334001',
    phone: '+1 (555) 123-4567',
    email: 'info@26asdesign.com',
  });

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      console.log('🔍 Loading contact info from API...');
      const response = await fetch('/api/site-settings/contact_info', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      console.log('🔍 Contact info API response status:', response.status);
      
      if (response.ok) {
        const contactData = await response.json();
        console.log('🔍 Contact info data received from API:', contactData);
        
        // Validate that we have the expected structure
        if (contactData && typeof contactData === 'object') {
          // Merge with defaults to ensure all required fields exist
          const mergedContactInfo = {
            address: contactData.address || 'E-35 Karni Nagar, Lalgarh, Bikaner, 334001',
            phone: contactData.phone || '+1 (555) 123-4567',
            email: contactData.email || 'info@26asdesign.com'
          };
          console.log('🔍 Setting contact info from API data');
          setContactInfo(mergedContactInfo);
        } else {
          console.warn('🔍 Invalid contact info data structure:', contactData);
        }
      } else {
        const errorText = await response.text();
        console.error('🔍 Failed to load contact info from API:', response.status, errorText);
      }
    } catch (error) {
      console.error('🔍 Contact info API error:', error);
    }
  };

  return (
    <footer className="bg-black text-white py-16 border-t border-yellow-400/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-light tracking-widest mb-4 text-yellow-400">
              26AS
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Creating exceptional architectural experiences through innovative
              design and thoughtful execution.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-yellow-400">
              Contact Info
            </h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-yellow-400">
              Services
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>Architectural Design</li>
              <li>Interior Design</li>
              <li>Urban Planning</li>
              <li>Construction Management</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-400/20 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 26AS Design Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}