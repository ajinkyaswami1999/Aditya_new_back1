/*
  # Insert Sample Data

  1. Sample Projects
    - 3 featured projects with complete details
    - Different categories (Residential, Commercial)
    - High-quality images from Pexels

  2. Sample Team Members
    - 3 team members with different roles
    - Professional photos and detailed bios
    - Contact information and social links

  3. Sample Testimonials
    - 3 client testimonials with 5-star ratings
    - Linked to respective projects
    - Realistic client information

  4. Admin Users
    - Super admin with full permissions
    - Regular admin with limited permissions
    - Secure password hashes (demo purposes)

  5. Site Settings
    - Website statistics
    - Contact information
    - Social media links
    - Hero slider content
*/

-- Insert Sample Projects
INSERT INTO projects (
  id,
  title,
  category,
  location,
  year,
  description,
  details,
  client,
  area,
  duration,
  featured,
  main_image,
  additional_images
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Modern Villa Residence',
  'Residential',
  'California',
  '2024',
  'A stunning contemporary villa featuring clean lines and sustainable materials.',
  'This modern villa represents the pinnacle of contemporary residential design. Featuring floor-to-ceiling windows, an open-plan layout, and sustainable materials throughout, this home seamlessly blends indoor and outdoor living. The design incorporates passive solar heating, rainwater harvesting, and energy-efficient systems to minimize environmental impact while maximizing comfort and luxury.',
  'Johnson Family',
  '4,500 sq ft',
  '18 months',
  true,
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg'
  ]
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Corporate Headquarters',
  'Commercial',
  'New York',
  '2023',
  'State-of-the-art office building designed for maximum productivity and wellness.',
  'A revolutionary approach to corporate architecture that prioritizes employee wellbeing and environmental sustainability. The building features advanced HVAC systems, natural lighting optimization, and flexible workspace configurations. Biophilic design elements throughout the space promote mental health and productivity, while smart building technologies ensure optimal energy efficiency.',
  'Tech Innovations Corp',
  '25,000 sq ft',
  '24 months',
  true,
  'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg',
    'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
  ]
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'Luxury Penthouse',
  'Residential',
  'Miami',
  '2024',
  'High-end apartment with panoramic city views and premium finishes.',
  'This luxury penthouse showcases the finest in urban living with breathtaking panoramic views, premium materials, and cutting-edge smart home integration. The design features Italian marble, custom millwork, and floor-to-ceiling windows that frame the city skyline. Advanced home automation systems control lighting, climate, security, and entertainment throughout the residence.',
  'Private Client',
  '3,200 sq ft',
  '12 months',
  true,
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
    'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
  ]
);

-- Insert Sample Team Members
INSERT INTO team_members (
  id,
  name,
  position,
  bio,
  image_url,
  email,
  linkedin_url,
  sort_order,
  active
) VALUES 
(
  '660e8400-e29b-41d4-a716-446655440001',
  'Alex Rodriguez',
  'Principal Architect',
  'Lead architect with over 15 years of experience in sustainable design and urban planning. Alex specializes in creating innovative residential and commercial spaces that harmonize with their environment while pushing the boundaries of contemporary architecture.',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  'alex@26asdesign.com',
  'https://linkedin.com/in/alexrodriguez',
  1,
  true
),
(
  '660e8400-e29b-41d4-a716-446655440002',
  'Sarah Kim',
  'Design Director',
  'Creative director specializing in interior design and space optimization for modern living. Sarah brings a unique perspective to each project, combining functionality with aesthetic excellence to create spaces that truly reflect our clients'' personalities and lifestyles.',
  'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg',
  'sarah@26asdesign.com',
  'https://linkedin.com/in/sarahkim',
  2,
  true
),
(
  '660e8400-e29b-41d4-a716-446655440003',
  'Michael Chen',
  'Project Manager',
  'Experienced project manager ensuring timely delivery and quality execution of all projects. Michael coordinates between design teams, contractors, and clients to ensure every project meets our high standards while staying on schedule and within budget.',
  'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
  'michael@26asdesign.com',
  'https://linkedin.com/in/michaelchen',
  3,
  true
);

-- Insert Sample Testimonials
INSERT INTO testimonials (
  id,
  client_name,
  client_position,
  testimonial_text,
  rating,
  project_id,
  active
) VALUES 
(
  '770e8400-e29b-41d4-a716-446655440001',
  'Sarah Johnson',
  'CEO, Tech Innovations',
  '26AS Design Studio transformed our office space into a modern, functional workplace that truly reflects our company culture. The attention to detail and innovative design solutions exceeded our expectations.',
  5,
  '550e8400-e29b-41d4-a716-446655440002',
  true
),
(
  '770e8400-e29b-41d4-a716-446655440002',
  'Robert Johnson',
  'Homeowner',
  'The team delivered beyond our expectations. Our new home is a perfect blend of contemporary design and practical living. Every space feels thoughtfully designed and beautifully executed.',
  5,
  '550e8400-e29b-41d4-a716-446655440001',
  true
),
(
  '770e8400-e29b-41d4-a716-446655440003',
  'Lisa Rodriguez',
  'Property Developer',
  'Working with 26AS was seamless. They understood our vision and created a space that our residents absolutely love. The penthouse design is both luxurious and functional.',
  5,
  '550e8400-e29b-41d4-a716-446655440003',
  true
);

-- Insert Admin Users
INSERT INTO admin_users (
  id,
  username,
  password_hash,
  role,
  permissions,
  active
) VALUES 
(
  '880e8400-e29b-41d4-a716-446655440001',
  'superadmin',
  'super123',
  'super_admin',
  '{
    "projects": true,
    "team": true,
    "testimonials": true,
    "stats": true,
    "contact": true,
    "social": true,
    "users": true
  }',
  true
),
(
  '880e8400-e29b-41d4-a716-446655440002',
  'admin',
  'admin123',
  'admin',
  '{
    "projects": true,
    "team": true,
    "testimonials": true,
    "stats": false,
    "contact": false,
    "social": false,
    "users": false
  }',
  true
);

-- Insert Site Settings
INSERT INTO site_settings (key, value, description) VALUES 
(
  'stats',
  '{
    "projectsCompleted": 150,
    "yearsExperience": 12,
    "happyClients": 200,
    "successRate": 95
  }',
  'Website statistics displayed on homepage'
),
(
  'contact_info',
  '{
    "address": "123 Design Street, Suite 456, New York, NY 10001",
    "phone": "+1 (555) 123-4567",
    "email": "info@26asdesign.com"
  }',
  'Contact information for the studio'
),
(
  'social_links',
  '{
    "facebook": "https://facebook.com/26asdesign",
    "instagram": "https://instagram.com/26asdesign",
    "twitter": "https://twitter.com/26asdesign",
    "youtube": "https://youtube.com/@26asdesign",
    "linkedin": "https://linkedin.com/company/26asdesign",
    "behance": "https://behance.net/26asdesign"
  }',
  'Social media links for the studio'
),
(
  'hero_slides',
  '[
    {
      "image": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "title": "Modern Architecture",
      "subtitle": "Creating spaces that inspire"
    },
    {
      "image": "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg",
      "title": "Innovative Design",
      "subtitle": "Where form meets function"
    },
    {
      "image": "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
      "title": "Contemporary Living",
      "subtitle": "Redefining residential spaces"
    }
  ]',
  'Hero slider content for homepage'
);