import { supabaseClient } from './supabase-client';
import { supabaseAdmin, supabaseServerClient, testSupabaseConnection } from './supabase-server';

// Database types
export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  details: string;
  client: string;
  area: string;
  duration: string;
  featured: boolean;
  main_image: string;
  additional_images: string[];
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  email: string;
  linkedin_url: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_position: string;
  testimonial_text: string;
  rating: number;
  project_id: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  role: 'admin' | 'super_admin';
  permissions: Record<string, boolean>;
  active: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface SiteSettings {
  stats: {
    projectsCompleted: number;
    yearsExperience: number;
    happyClients: number;
    successRate: number;
  };
  contact_info: {
    address: string;
    phone: string;
    email: string;
  };
  social_links: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    linkedin: string;
    behance: string;
  };
  hero_slides: Array<{
    image: string;
    title: string;
    subtitle: string;
  }>;
}

// Fallback data for when Supabase is not connected
const fallbackData = {
  projects: [
    {
      id: "1",
      title: "Modern Villa Residence",
      category: "Residential",
      location: "California",
      year: "2024",
      description: "A stunning contemporary villa featuring clean lines and sustainable materials.",
      details: "This modern villa represents the pinnacle of contemporary residential design. Featuring floor-to-ceiling windows, an open-plan layout, and sustainable materials throughout, this home seamlessly blends indoor and outdoor living.",
      client: "Johnson Family",
      area: "4,500 sq ft",
      duration: "18 months",
      featured: true,
      main_image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      additional_images: [
        "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
      ],
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z"
    },
    {
      id: "2",
      title: "Corporate Headquarters",
      category: "Commercial",
      location: "New York",
      year: "2023",
      description: "State-of-the-art office building designed for maximum productivity and wellness.",
      details: "A revolutionary approach to corporate architecture that prioritizes employee wellbeing and environmental sustainability. The building features advanced HVAC systems, natural lighting optimization, and flexible workspace configurations.",
      client: "Tech Innovations Corp",
      area: "25,000 sq ft",
      duration: "24 months",
      featured: true,
      main_image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg",
      additional_images: [
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        "https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg"
      ],
      created_at: "2023-06-20T14:30:00Z",
      updated_at: "2023-06-20T14:30:00Z"
    },
    {
      id: "3",
      title: "Luxury Penthouse",
      category: "Residential",
      location: "Miami",
      year: "2024",
      description: "High-end apartment with panoramic city views and premium finishes.",
      details: "This luxury penthouse showcases the finest in urban living with breathtaking panoramic views, premium materials, and cutting-edge smart home integration.",
      client: "Private Client",
      area: "3,200 sq ft",
      duration: "12 months",
      featured: true,
      main_image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      additional_images: [
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
        "https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg"
      ],
      created_at: "2024-03-10T09:15:00Z",
      updated_at: "2024-03-10T09:15:00Z"
    }
  ],
  team_members: [
    {
      id: "1",
      name: "Alex Rodriguez",
      position: "Principal Architect",
      bio: "Lead architect with over 15 years of experience in sustainable design and urban planning.",
      image_url: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      email: "alex@26asdesign.com",
      linkedin_url: "https://linkedin.com/in/alexrodriguez",
      sort_order: 1,
      active: true,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z"
    },
    {
      id: "2",
      name: "Sarah Kim",
      position: "Design Director",
      bio: "Creative director specializing in interior design and space optimization for modern living.",
      image_url: "https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg",
      email: "sarah@26asdesign.com",
      linkedin_url: "https://linkedin.com/in/sarahkim",
      sort_order: 2,
      active: true,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z"
    },
    {
      id: "3",
      name: "Michael Chen",
      position: "Project Manager",
      bio: "Experienced project manager ensuring timely delivery and quality execution of all projects.",
      image_url: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      email: "michael@26asdesign.com",
      linkedin_url: "https://linkedin.com/in/michaelchen",
      sort_order: 3,
      active: true,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z"
    }
  ],
  testimonials: [
    {
      id: "1",
      client_name: "Sarah Johnson",
      client_position: "CEO, Tech Innovations",
      testimonial_text: "26AS Design Studio transformed our office space into a modern, functional workplace that truly reflects our company culture.",
      rating: 5,
      project_id: "2",
      active: true,
      created_at: "2023-07-01T00:00:00Z",
      updated_at: "2023-07-01T00:00:00Z"
    },
    {
      id: "2",
      client_name: "Michael Chen",
      client_position: "Homeowner",
      testimonial_text: "The team delivered beyond our expectations. Our new home is a perfect blend of contemporary design and practical living.",
      rating: 5,
      project_id: "1",
      active: true,
      created_at: "2024-02-01T00:00:00Z",
      updated_at: "2024-02-01T00:00:00Z"
    },
    {
      id: "3",
      client_name: "Lisa Rodriguez",
      client_position: "Hotel Manager",
      testimonial_text: "Working with 26AS was seamless. They understood our vision and created a space that our guests absolutely love.",
      rating: 5,
      project_id: "3",
      active: true,
      created_at: "2024-04-01T00:00:00Z",
      updated_at: "2024-04-01T00:00:00Z"
    }
  ],
  site_settings: {
    stats: {
      projectsCompleted: 150,
      yearsExperience: 12,
      happyClients: 200,
      successRate: 95
    },
    contact_info: {
      address: "Mumbai, Maharashtra, India",
      phone: "+91 98765 43210",
      email: "info@26asdesign.com"
    },
    social_links: {
      facebook: "https://facebook.com/26asdesign",
      instagram: "https://instagram.com/26asdesign",
      twitter: "https://twitter.com/26asdesign",
      youtube: "https://youtube.com/@26asdesign",
      linkedin: "https://linkedin.com/company/26asdesign",
      behance: "https://behance.net/26asdesign"
    },
    hero_slides: [
      {
        image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
        title: "Modern Architecture",
        subtitle: "Creating spaces that inspire"
      },
      {
        image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg",
        title: "Innovative Design",
        subtitle: "Where form meets function"
      },
      {
        image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
        title: "Contemporary Living",
        subtitle: "Redefining residential spaces"
      }
    ]
  },
  admin_users: [
    {
      id: "1",
      username: "superadmin",
      password_hash: "super123",
      role: "super_admin" as const,
      permissions: {
        projects: true,
        team: true,
        stats: true,
        contact: true,
        social: true,
        users: true
      },
      active: true,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z"
    },
    {
      id: "2",
      username: "admin",
      password_hash: "admin123",
      role: "admin" as const,
      permissions: {
        projects: true,
        team: true,
        stats: false,
        contact: false,
        social: false,
        users: false
      },
      active: true,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z"
    }
  ]
};

// Generate unique ID
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Enhanced connection check with retry
async function isSupabaseConnectedWithRetry(retries = 1): Promise<boolean> {
  for (let i = 0; i <= retries; i++) {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.log(`[Attempt ${i + 1}] Supabase not configured`);
        return false;
      }
      
      if (!supabaseServerClient) {
        console.log(`[Attempt ${i + 1}] Supabase server client not available`);
        return false;
      }
      
      const { data, error } = await supabaseServerClient
        .from('projects')
        .select('count')
        .limit(1);
      
      if (!error) {
        console.log(`[Attempt ${i + 1}] Supabase connection successful`);
        return true;
      }
      
      console.log(`[Attempt ${i + 1}] Supabase connection failed:`, error.message);
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
      }
    } catch (error) {
      console.log(`[Attempt ${i + 1}] Supabase connection error:`, error instanceof Error ? error.message : 'Unknown error');
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
  console.log(`[Final] All ${retries + 1} Supabase connection attempts failed - using fallback data`);
  return false;
}

// Projects API
export const projectsApi = {
  async getAll(): Promise<Project[]> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseServerClient) {
        console.log('Loading projects from Supabase database...');
        const { data, error } = await supabaseServerClient
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          console.log(`Loaded ${data.length} projects from database`);
          return data.map(project => ({
            ...project,
            additional_images: project.additional_images || []
          }));
        } else {
          console.error('Error loading projects from database:', error);
          throw new Error('Failed to load from database');
        }
      }
    } catch (error) {
      console.log('Supabase not available, using fallback projects data:', error);
    }
    
    console.log('Using fallback projects data');
    return fallbackData.projects;
  },

  async getById(id: string): Promise<Project | null> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseServerClient) {
        console.log(`Loading project ${id} from Supabase database...`);
        const { data, error } = await supabaseServerClient
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();
        
        if (!error && data) {
          console.log(`Loaded project ${id} from database`);
          return {
            ...data,
            additional_images: data.additional_images || []
          };
        } else {
          console.error(`Error loading project ${id} from database:`, error);
          throw new Error('Failed to load from database');
        }
      }
    } catch (error) {
      console.log(`Supabase not available for project ${id}, using fallback data:`, error);
    }
    
    console.log(`Using fallback data for project ${id}`);
    return fallbackData.projects.find(project => project.id === id) || null;
  },

  async getFeatured(): Promise<Project[]> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseServerClient) {
        console.log('Loading featured projects from Supabase database...');
        const { data, error } = await supabaseServerClient
          .from('projects')
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          console.log(`Loaded ${data.length} featured projects from database`);
          return data.map(project => ({
            ...project,
            additional_images: project.additional_images || []
          }));
        } else {
          console.error('Error loading featured projects from database:', error);
          throw new Error('Failed to load from database');
        }
      }
    } catch (error) {
      console.log('Supabase not available, using fallback featured projects data:', error);
    }
    
    console.log('Using fallback featured projects data');
    return fallbackData.projects.filter(project => project.featured);
  },

  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    // Validate required fields
    if (!project.title || !project.category || !project.location) {
      throw new Error('Missing required fields: title, category, location');
    }

    const newProject: Project = {
      ...project,
      additional_images: project.additional_images || [],
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('projects')
          .insert([newProject])
          .select()
          .single();
        
        if (!error && data) {
          return {
            ...data,
            additional_images: data.additional_images || []
          };
        }
        console.log('Supabase insert failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for project creation, using fallback:', error);
    }
    
    // Fallback: Add to demo data (works for current session)
    fallbackData.projects.unshift(newProject);
    return newProject;
  },

  async update(id: string, updates: Partial<Project>): Promise<Project> {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('projects')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();
        
        if (!error && data) {
          return {
            ...data,
            additional_images: data.additional_images || []
          };
        }
        console.log('Supabase update failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for project update, using fallback:', error);
    }
    
    // Fallback: Update in demo data
    const projectIndex = fallbackData.projects.findIndex(p => p.id === id);
    if (projectIndex !== -1) {
      fallbackData.projects[projectIndex] = {
        ...fallbackData.projects[projectIndex],
        ...updateData,
        additional_images: updateData.additional_images || fallbackData.projects[projectIndex].additional_images
      };
      return fallbackData.projects[projectIndex];
    }
    
    throw new Error('Project not found');
  },

  async delete(id: string): Promise<void> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { error } = await supabaseAdmin
          .from('projects')
          .delete()
          .eq('id', id);
        
        if (!error) {
          return;
        }
        console.log('Supabase delete failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for project deletion, using fallback:', error);
    }
    
    // Fallback: Remove from demo data
    const projectIndex = fallbackData.projects.findIndex(p => p.id === id);
    if (projectIndex !== -1) {
      fallbackData.projects.splice(projectIndex, 1);
    }
  }
};

// Team Members API
export const teamMembersApi = {
  async getAll(): Promise<TeamMember[]> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseServerClient) {
        console.log('Loading team members from Supabase database...');
        const { data, error } = await supabaseServerClient
          .from('team_members')
          .select('*')
          .eq('active', true)
          .order('sort_order', { ascending: true });
        
        if (!error && data) {
          console.log(`Loaded ${data.length} team members from database`);
          return data;
        } else {
          console.error('Error loading team members from database:', error);
          throw new Error('Failed to load from database');
        }
      }
    } catch (error) {
      console.log('Supabase not available, using fallback team members data:', error);
    }
    
    console.log('Using fallback team members data');
    return fallbackData.team_members.filter(member => member.active);
  },

  async create(member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember> {
    // Validate required fields
    if (!member.name || !member.position) {
      throw new Error('Missing required fields: name, position');
    }

    const newMember: TeamMember = {
      ...member,
      bio: member.bio || '',
      email: member.email || '',
      linkedin_url: member.linkedin_url || '',
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('team_members')
          .insert([newMember])
          .select()
          .single();
        
        if (!error && data) {
          return data;
        }
        console.log('Supabase insert failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for team member creation, using fallback:', error);
    }
    
    // Fallback: Add to demo data
    fallbackData.team_members.push(newMember);
    return newMember;
  },

  async update(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('team_members')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();
        
        if (!error && data) {
          return data;
        }
        console.log('Supabase update failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for team member update, using fallback:', error);
    }
    
    // Fallback: Update in demo data
    const memberIndex = fallbackData.team_members.findIndex(m => m.id === id);
    if (memberIndex !== -1) {
      fallbackData.team_members[memberIndex] = {
        ...fallbackData.team_members[memberIndex],
        ...updateData
      };
      return fallbackData.team_members[memberIndex];
    }
    
    throw new Error('Team member not found');
  },

  async delete(id: string): Promise<void> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { error } = await supabaseAdmin
          .from('team_members')
          .delete()
          .eq('id', id);
        
        if (!error) {
          return;
        }
        console.log('Supabase delete failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for team member deletion, using fallback:', error);
    }
    
    // Fallback: Remove from demo data
    const memberIndex = fallbackData.team_members.findIndex(m => m.id === id);
    if (memberIndex !== -1) {
      fallbackData.team_members.splice(memberIndex, 1);
    }
  }
};

// Testimonials API
export const testimonialsApi = {
  async getAll(): Promise<Testimonial[]> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseServerClient) {
        console.log('Loading testimonials from Supabase database...');
        const { data, error } = await supabaseServerClient
          .from('testimonials')
          .select('*')
          .eq('active', true)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          console.log(`Loaded ${data.length} testimonials from database`);
          return data;
        } else {
          console.error('Error loading testimonials from database:', error);
          throw new Error('Failed to load from database');
        }
      }
    } catch (error) {
      console.log('Supabase not available, using fallback testimonials data:', error);
    }
    
    console.log('Using fallback testimonials data');
    return fallbackData.testimonials.filter(testimonial => testimonial.active);
  },

  async create(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Promise<Testimonial> {
    // Validate required fields
    if (!testimonial.client_name || !testimonial.testimonial_text) {
      throw new Error('Missing required fields: client_name, testimonial_text');
    }

    const newTestimonial: Testimonial = {
      ...testimonial,
      project_id: testimonial.project_id || '',
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('testimonials')
          .insert([newTestimonial])
          .select()
          .single();
        
        if (!error && data) {
          return data;
        }
        console.log('Supabase insert failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for testimonial creation, using fallback:', error);
    }
    
    // Fallback: Add to demo data
    fallbackData.testimonials.push(newTestimonial);
    return newTestimonial;
  },

  async update(id: string, updates: Partial<Testimonial>): Promise<Testimonial> {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('testimonials')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();
        
        if (!error && data) {
          return data;
        }
        console.log('Supabase update failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for testimonial update, using fallback:', error);
    }
    
    // Fallback: Update in demo data
    const testimonialIndex = fallbackData.testimonials.findIndex(t => t.id === id);
    if (testimonialIndex !== -1) {
      fallbackData.testimonials[testimonialIndex] = {
        ...fallbackData.testimonials[testimonialIndex],
        ...updateData
      };
      return fallbackData.testimonials[testimonialIndex];
    }
    
    throw new Error('Testimonial not found');
  },

  async delete(id: string): Promise<void> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { error } = await supabaseAdmin
          .from('testimonials')
          .delete()
          .eq('id', id);
        
        if (!error) {
          return;
        }
        console.log('Supabase delete failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for testimonial deletion, using fallback:', error);
    }
    
    // Fallback: Remove from demo data
    const testimonialIndex = fallbackData.testimonials.findIndex(t => t.id === id);
    if (testimonialIndex !== -1) {
      fallbackData.testimonials.splice(testimonialIndex, 1);
    }
  }
};

// Site Settings API
export const siteSettingsApi = {
  async get(key: keyof SiteSettings): Promise<any> {
    console.log(`[DataManager] Getting site setting: ${key}`);
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseServerClient) {
        console.log(`Loading ${key} from Supabase database...`);
        const { data, error } = await supabaseServerClient
          .from('site_settings')
          .select('value')
          .eq('key', key)
          .single();
        
        if (!error && data?.value) {
          console.log(`Loaded ${key} from database`);
          const parsedValue = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
          console.log(`[DataManager] Successfully parsed ${key}:`, parsedValue);
          return parsedValue;
        } else {
          console.error(`[DataManager] Error loading ${key} from database:`, error);
          if (error?.code === 'PGRST116') {
            console.log(`[DataManager] ${key} not found in database, this might be expected for new settings`);
            // Return fallback for missing settings
            console.log(`Using fallback ${key} data (setting not found in database)`);
            return (fallbackData.site_settings as any)[key];
          }
          throw new Error(`Failed to load ${key} from database: ${error?.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.log(`[DataManager] Supabase not available for ${key}, using fallback data:`, error);
    }
    
    console.log(`[DataManager] Using fallback ${key} data`);
    return (fallbackData.site_settings as any)[key];
  },

  async set(key: keyof SiteSettings, value: any): Promise<void> {
    console.log(`[DataManager] Setting site setting: ${key}`, value);
    try {
      const isConnected = await isSupabaseConnectedWithRetry(2); // Try harder for writes
      console.log(`[DataManager] Supabase connection status for ${key}:`, isConnected);
      
      if (isConnected && supabaseAdmin) {
        console.log(`[DataManager] Updating ${key} in Supabase database...`);
        
        // First try to update existing record
        const { error: updateError } = await supabaseAdmin
          .from('site_settings')
          .update({
            value: JSON.stringify(value),
            updated_at: new Date().toISOString()
          })
          .eq('key', key);
        
        if (!updateError) {
          console.log(`[DataManager] Successfully updated ${key} in database`);
          return;
        }
        
        // If update failed (record doesn't exist), try to insert
        console.log(`[DataManager] Update failed, trying insert for ${key}:`, updateError);
        const { error: insertError } = await supabaseAdmin
          .from('site_settings')
          .insert({
            key,
            value: JSON.stringify(value),
            description: `Website ${key} configuration`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        
        if (!insertError) {
          console.log(`[DataManager] Successfully inserted ${key} in database`);
          return;
        }
        
        console.error(`[DataManager] Both update and insert failed for ${key}:`, { updateError, insertError });
        throw new Error(`Failed to save ${key}: ${insertError.message}`);
      } else {
        console.error(`[DataManager] Supabase not available for updating ${key}`);
        console.error(`[DataManager] Connection status: ${isConnected}`);
        console.error(`[DataManager] Admin client available: ${!!supabaseAdmin}`);
        console.error(`[DataManager] Environment variables:`, {
          hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
        });
        throw new Error(`Supabase not available. Connected: ${isConnected}, Admin client: ${!!supabaseAdmin}`);
      }
    } catch (error) {
      console.error(`[DataManager] Error updating ${key}:`, error);
      throw error;
    }
  }
};

// Admin Users API
export const adminUsersApi = {
  async getAll(): Promise<AdminUser[]> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        console.log('Loading admin users from Supabase database...');
        const { data, error } = await supabaseAdmin
          .from('admin_users')
          .select('*')
          .eq('active', true)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          console.log(`Loaded ${data.length} admin users from database`);
          return data;
        } else {
          console.error('Error loading admin users from database:', error);
          throw new Error('Failed to load from database');
        }
      }
    } catch (error) {
      console.log('Supabase not available, using fallback admin users data:', error);
    }
    
    console.log('Using fallback admin users data');
    return fallbackData.admin_users.filter(user => user.active);
  },

  async authenticate(username: string, password: string): Promise<AdminUser | null> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        console.log(`Authenticating user ${username} via Supabase database...`);
        const { data, error } = await supabaseAdmin
          .from('admin_users')
          .select('*')
          .eq('username', username)
          .eq('active', true)
          .single();
        
        if (!error && data && data.password_hash === password) {
          console.log(`User ${username} authenticated successfully via database`);
          // Update last login
          if (supabaseAdmin) {
            await supabaseAdmin
            .from('admin_users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', data.id);
          }
          
          return data;
        } else {
          console.log(`Authentication failed for ${username} via database`);
          return null;
        }
      }
    } catch (error) {
      console.log(`Supabase not available for authentication, using fallback for ${username}:`, error);
    }
    
    // Fallback authentication
    console.log(`Using fallback authentication for ${username}`);
    const user = fallbackData.admin_users.find(u => u.username === username && u.active);
    if (user && user.password_hash === password) {
      console.log(`User ${username} authenticated successfully via fallback`);
      return user;
    }
    console.log(`Authentication failed for ${username} via fallback`);
    return null;
  },

  async create(user: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>): Promise<AdminUser> {
    // Validate required fields
    if (!user.username || !user.password_hash) {
      throw new Error('Missing required fields: username, password_hash');
    }

    const newUser: AdminUser = {
      ...user,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('admin_users')
          .insert([newUser])
          .select()
          .single();
        
        if (!error && data) {
          return data;
        }
        console.log('Supabase insert failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for user creation, using fallback:', error);
    }
    
    // Fallback: Add to demo data
    fallbackData.admin_users.push(newUser as any);
    return newUser;
  },

  async update(id: string, updates: Partial<AdminUser>): Promise<AdminUser> {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('admin_users')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();
        
        if (!error && data) {
          return data;
        }
        console.log('Supabase update failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for user update, using fallback:', error);
    }
    
    // Fallback: Update in demo data
    const userIndex = fallbackData.admin_users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      fallbackData.admin_users[userIndex] = {
        ...fallbackData.admin_users[userIndex],
        ...updateData
      } as any;
      return fallbackData.admin_users[userIndex];
    }
    
    throw new Error('User not found');
  },

  async delete(id: string): Promise<void> {
    try {
      if (await isSupabaseConnectedWithRetry() && supabaseAdmin) {
        const { error } = await supabaseAdmin
          .from('admin_users')
          .delete()
          .eq('id', id);
        
        if (!error) {
          return;
        }
        console.log('Supabase delete failed, using fallback:', error);
      }
    } catch (error) {
      console.log('Supabase not available for user deletion, using fallback:', error);
    }
    
    // Fallback: Remove from demo data
    const userIndex = fallbackData.admin_users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      fallbackData.admin_users.splice(userIndex, 1);
    }
  }
};