'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  FolderOpen, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminUser {
  id: string;
  username: string;
  role: string;
  permissions: Record<string, boolean>;
}

interface Project {
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
  additional_images?: string[];
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  image_url: string;
  active: boolean;
}

interface Testimonial {
  id: string;
  client_name: string;
  client_position: string;
  testimonial_text: string;
  rating: number;
  active: boolean;
}

interface SiteStats {
  projectsCompleted: number;
  yearsExperience: number;
  happyClients: number;
  successRate: number;
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  behance: string;
}

export default function AdminPanel() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(true);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<SiteStats>({
    projectsCompleted: 0,
    yearsExperience: 0,
    happyClients: 0,
    successRate: 0
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: '',
    phone: '',
    email: ''
  });
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    behance: ''
  });

  // Modal states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    location: '',
    year: '',
    description: '',
    details: '',
    client: '',
    area: '',
    duration: '',
    featured: false,
    main_image: '',
    additional_images: [] as string[]
  });

  const [teamForm, setTeamForm] = useState({
    name: '',
    position: '',
    bio: '',
    image_url: '',
    active: true
  });

  const [testimonialForm, setTestimonialForm] = useState({
    client_name: '',
    client_position: '',
    testimonial_text: '',
    rating: 5,
    active: true
  });

  // Modal functions
  const openProjectModal = (project?: Project) => {
    if (project) {
      setEditingItem(project);
      setProjectForm({
        title: project.title,
        category: project.category,
        location: project.location,
        year: project.year,
        description: project.description,
        details: project.details,
        client: project.client,
        area: project.area,
        duration: project.duration,
        featured: project.featured,
        main_image: project.main_image,
        additional_images: project.additional_images || []
      });
    } else {
      setEditingItem(null);
      setProjectForm({
        title: '',
        category: '',
        location: '',
        year: '',
        description: '',
        details: '',
        client: '',
        area: '',
        duration: '',
        featured: false,
        main_image: '',
        additional_images: []
      });
    }
    setShowProjectModal(true);
  };

  const openTeamModal = (member?: TeamMember) => {
    if (member) {
      setEditingItem(member);
      setTeamForm({
        name: member.name,
        position: member.position,
        bio: member.bio || '',
        image_url: member.image_url,
        active: member.active
      });
    } else {
      setEditingItem(null);
      setTeamForm({
        name: '',
        position: '',
        bio: '',
        image_url: '',
        active: true
      });
    }
    setShowTeamModal(true);
  };

  const openTestimonialModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingItem(testimonial);
      setTestimonialForm({
        client_name: testimonial.client_name,
        client_position: testimonial.client_position,
        testimonial_text: testimonial.testimonial_text,
        rating: testimonial.rating,
        active: testimonial.active
      });
    } else {
      setEditingItem(null);
      setTestimonialForm({
        client_name: '',
        client_position: '',
        testimonial_text: '',
        rating: 5,
        active: true
      });
    }
    setShowTestimonialModal(true);
  };

  // Save functions
  const saveProject = async () => {
    try {
      const url = editingItem ? `/api/projects/${editingItem.id}` : '/api/projects';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm)
      });
      
      if (!response.ok) throw new Error('Failed to save project');
      
      setShowProjectModal(false);
      setEditingItem(null);
      alert(editingItem ? 'Project updated successfully!' : 'Project created successfully!');
      loadAllData(); // Refresh data
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    }
  };

  const saveTeamMember = async () => {
    try {
      const url = editingItem ? `/api/team-members/${editingItem.id}` : '/api/team-members';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamForm)
      });
      
      if (!response.ok) throw new Error('Failed to save team member');
      
      setShowTeamModal(false);
      setEditingItem(null);
      alert(editingItem ? 'Team member updated successfully!' : 'Team member created successfully!');
      loadAllData(); // Refresh data
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Error saving team member');
    }
  };

  const saveTestimonial = async () => {
    try {
      const url = editingItem ? `/api/testimonials/${editingItem.id}` : '/api/testimonials';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialForm)
      });
      
      if (!response.ok) throw new Error('Failed to save testimonial');
      
      setShowTestimonialModal(false);
      setEditingItem(null);
      alert(editingItem ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
      loadAllData(); // Refresh data
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial');
    }
  };

  // Image upload function
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'project' | 'team' | 'additional') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (type === 'project') {
        setProjectForm({...projectForm, main_image: base64});
      } else if (type === 'additional') {
        setProjectForm({
          ...projectForm, 
          additional_images: [...projectForm.additional_images, base64]
        });
      } else if (type === 'team') {
        setTeamForm({...teamForm, image_url: base64});
      }
    };
    reader.readAsDataURL(file);
  };

  const addAdditionalImageUrl = (url: string) => {
    if (url.trim()) {
      setProjectForm({
        ...projectForm,
        additional_images: [...projectForm.additional_images, url.trim()]
      });
    }
  };

  const removeAdditionalImage = (index: number) => {
    setProjectForm({
      ...projectForm,
      additional_images: projectForm.additional_images.filter((_, i) => i !== index)
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    console.log('Checking authentication...');
    const adminUser = localStorage.getItem('admin_user');
    if (!adminUser) {
      console.log('No admin user found, redirecting to login');
      router.push('/admin/login');
      return;
    }
    
    try {
      const userData = JSON.parse(adminUser);
      console.log('User data found:', userData);
      setUser(userData);
      loadAllData();
    } catch (error) {
      console.error('Invalid user data:', error);
      router.push('/admin/login');
    }
  };

  const loadAllData = async () => {
    try {
      console.log('Loading admin data...');
      const [projectsRes, teamRes, testimonialsRes, statsRes, contactRes, socialRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/team-members'),
        fetch('/api/testimonials'),
        fetch('/api/site-settings/stats'),
        fetch('/api/site-settings/contact_info'),
        fetch('/api/site-settings/social_links')
      ]);

      console.log('API responses:', { 
        projects: projectsRes.status, 
        team: teamRes.status, 
        testimonials: testimonialsRes.status,
        stats: statsRes.status,
        contact: contactRes.status,
        social: socialRes.status
      });

      if (projectsRes.ok) { const data = await projectsRes.json(); setProjects(data); console.log('Projects loaded:', data.length); }
      if (teamRes.ok) { const data = await teamRes.json(); setTeamMembers(data); console.log('Team loaded:', data.length); }
      if (testimonialsRes.ok) { const data = await testimonialsRes.json(); setTestimonials(data); console.log('Testimonials loaded:', data.length); }
      if (statsRes.ok) { const data = await statsRes.json(); setStats(data); console.log('Stats loaded:', data); }
      if (contactRes.ok) { const data = await contactRes.json(); setContactInfo(data); console.log('Contact loaded:', data); }
      if (socialRes.ok) { const data = await socialRes.json(); setSocialLinks(data); console.log('Social loaded:', data); }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const saveStats = async () => {
    try {
      console.log('Saving stats:', stats);
      await fetch('/api/site-settings/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats)
      });
      console.log('Stats saved successfully');
      alert('Stats updated successfully!');
      // Force reload data to verify changes
      setTimeout(() => {
        loadAllData();
      }, 500);
    } catch (error) {
      console.error('Error saving stats:', error);
      alert('Error updating stats');
    }
  };

  const saveContactInfo = async () => {
    try {
      console.log('Saving contact info:', contactInfo);
      await fetch('/api/site-settings/contact_info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo)
      });
      console.log('Contact info saved successfully');
      alert('Contact info updated successfully!');
      // Force reload data to verify changes
      setTimeout(() => {
        loadAllData();
      }, 500);
    } catch (error) {
      console.error('Error saving contact info:', error);
      alert('Error updating contact info');
    }
  };

  const saveSocialLinks = async () => {
    try {
      console.log('Saving social links:', socialLinks);
      await fetch('/api/site-settings/social_links', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socialLinks)
      });
      console.log('Social links saved successfully');
      alert('Social links updated successfully!');
      // Force reload data to verify changes
      setTimeout(() => {
        loadAllData();
      }, 500);
    } catch (error) {
      console.error('Error saving social links:', error);
      alert('Error updating social links');
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p.id !== id));
      alert('Project deleted successfully!');
    } catch (error) {
      alert('Error deleting project');
    }
  };

  const deleteTeamMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      await fetch(`/api/team-members/${id}`, { method: 'DELETE' });
      setTeamMembers(teamMembers.filter(m => m.id !== id));
      alert('Team member deleted successfully!');
    } catch (error) {
      alert('Error deleting team member');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      setTestimonials(testimonials.filter(t => t.id !== id));
      alert('Testimonial deleted successfully!');
    } catch (error) {
      alert('Error deleting testimonial');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-yellow-400 mb-4">Loading admin panel...</div>
          <div className="text-gray-400 text-sm">
            <p>Projects: {projects.length}</p>
            <p>Team: {teamMembers.length}</p>
            <p>Testimonials: {testimonials.length}</p>
            <p>Check console for details</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tabs = [
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-yellow-400/20 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-light text-yellow-400">26AS Admin Panel</h1>
            <span className="text-gray-400">Welcome, {user.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-900 min-h-screen p-6">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-light text-yellow-400">Projects Management</h2>
                <button
                  onClick={() => {
                    openProjectModal();
                  }}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-yellow-500 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                    <img
                      src={project.main_image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-medium mb-2 text-white">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            openProjectModal(project);
                          }}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          <Edit className="w-4 h-4 inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 inline mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-light text-yellow-400">Team Management</h2>
                <button
                  onClick={() => {
                    openTeamModal();
                  }}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-yellow-500 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Team Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-black text-2xl font-bold">
                          {member.name.split(' ').map(n => n.charAt(0)).join('')}
                        </span>
                      </div>
                      <h3 className="text-xl font-medium text-white">{member.name}</h3>
                      <p className="text-yellow-400">{member.position}</p>
                      {member.bio && (
                        <p className="text-gray-400 text-sm mt-2">{member.bio}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          openTeamModal(member);
                        }}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4 inline mr-1" />
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteTeamMember(member.id)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-light text-yellow-400">Testimonials Management</h2>
                <button
                  onClick={() => {
                    openTestimonialModal();
                  }}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-yellow-500 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">{testimonial.client_name}</h3>
                        <p className="text-yellow-400">{testimonial.client_position}</p>
                        <div className="flex mt-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            openTestimonialModal(testimonial);
                          }}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteTestimonial(testimonial.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">"{testimonial.testimonial_text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h2 className="text-3xl font-light text-yellow-400 mb-8">Statistics Management</h2>
              
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Projects Completed</label>
                    <input
                      type="number"
                      value={stats.projectsCompleted}
                      onChange={(e) => setStats({...stats, projectsCompleted: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Years Experience</label>
                    <input
                      type="number"
                      value={stats.yearsExperience}
                      onChange={(e) => setStats({...stats, yearsExperience: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Happy Clients</label>
                    <input
                      type="number"
                      value={stats.happyClients}
                      onChange={(e) => setStats({...stats, happyClients: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Success Rate (%)</label>
                    <input
                      type="number"
                      value={stats.successRate}
                      onChange={(e) => setStats({...stats, successRate: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                </div>
                <button
                  onClick={saveStats}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                >
                  <Save className="w-5 h-5 inline mr-2" />
                  Save Statistics
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-light text-yellow-400">Site Settings</h2>
              
              {/* Contact Information */}
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
                <h3 className="text-xl font-medium text-white mb-6">Contact Information</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                    <input
                      type="text"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="text"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                </div>
                <button
                  onClick={saveContactInfo}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                >
                  <Save className="w-5 h-5 inline mr-2" />
                  Save Contact Info
                </button>
              </div>

              {/* Social Links */}
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
                <h3 className="text-xl font-medium text-white mb-6">Social Media Links</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
                    <input
                      type="url"
                      value={socialLinks.facebook}
                      onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                    <input
                      type="url"
                      value={socialLinks.instagram}
                      onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
                    <input
                      type="url"
                      value={socialLinks.twitter}
                      onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">YouTube</label>
                    <input
                      type="url"
                      value={socialLinks.youtube}
                      onChange={(e) => setSocialLinks({...socialLinks, youtube: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={socialLinks.linkedin}
                      onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Behance</label>
                    <input
                      type="url"
                      value={socialLinks.behance}
                      onChange={(e) => setSocialLinks({...socialLinks, behance: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                </div>
                <button
                  onClick={saveSocialLinks}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                >
                  <Save className="w-5 h-5 inline mr-2" />
                  Save Social Links
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-medium text-white">
                {editingItem ? 'Edit Project' : 'Add New Project'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Mixed-Use">Mixed-Use</option>
                    <option value="Renovation">Renovation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                  <input
                    type="text"
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({...projectForm, year: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Client</label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({...projectForm, client: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Area</label>
                  <input
                    type="text"
                    value={projectForm.area}
                    onChange={(e) => setProjectForm({...projectForm, area: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={projectForm.duration}
                    onChange={(e) => setProjectForm({...projectForm, duration: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-300">Featured Project</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Details</label>
                <textarea
                  value={projectForm.details}
                  onChange={(e) => setProjectForm({...projectForm, details: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Main Image</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'project')}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
                  />
                  <input
                    type="url"
                    placeholder="Or enter image URL"
                    value={projectForm.main_image}
                    onChange={(e) => setProjectForm({...projectForm, main_image: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  />
                  {projectForm.main_image && (
                    <img
                      src={projectForm.main_image}
                      alt="Preview"
                      className="w-32 h-24 object-cover rounded border border-gray-600"
                    />
                  )}
                </div>
              </div>
              
              {/* Additional Images Section */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Images</label>
                <div className="space-y-4">
                  {/* Upload Controls */}
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'additional')}
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                    />
                  </div>
                  
                  {/* URL Input */}
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      placeholder="Or enter image URL and press Enter"
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          addAdditionalImageUrl(target.value);
                          target.value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                        addAdditionalImageUrl(input.value);
                        input.value = '';
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  
                  {/* Image Preview Grid */}
                  {projectForm.additional_images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {projectForm.additional_images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Additional ${index + 1}`}
                            className="w-full h-20 object-cover rounded border border-gray-600"
                          />
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full text-xs hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-400">
                    Upload multiple images to showcase different views of your project
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex space-x-4">
              <button
                onClick={saveProject}
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                <Save className="w-5 h-5 inline mr-2" />
                {editingItem ? 'Update Project' : 'Create Project'}
              </button>
              <button
                onClick={() => setShowProjectModal(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 inline mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-medium text-white">
                {editingItem ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
                <input
                  type="text"
                  value={teamForm.position}
                  onChange={(e) => setTeamForm({...teamForm, position: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({...teamForm, bio: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'team')}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
                  />
                  <input
                    type="url"
                    placeholder="Or enter image URL"
                    value={teamForm.image_url}
                    onChange={(e) => setTeamForm({...teamForm, image_url: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  />
                  {teamForm.image_url && (
                    <img
                      src={teamForm.image_url}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-full border border-gray-600"
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={teamForm.active}
                  onChange={(e) => setTeamForm({...teamForm, active: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-300">Active Member</label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex space-x-4">
              <button
                onClick={saveTeamMember}
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                <Save className="w-5 h-5 inline mr-2" />
                {editingItem ? 'Update Member' : 'Create Member'}
              </button>
              <button
                onClick={() => setShowTeamModal(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 inline mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {showTestimonialModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-medium text-white">
                {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Client Name</label>
                <input
                  type="text"
                  value={testimonialForm.client_name}
                  onChange={(e) => setTestimonialForm({...testimonialForm, client_name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Client Position</label>
                <input
                  type="text"
                  value={testimonialForm.client_position}
                  onChange={(e) => setTestimonialForm({...testimonialForm, client_position: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Testimonial Text</label>
                <textarea
                  value={testimonialForm.testimonial_text}
                  onChange={(e) => setTestimonialForm({...testimonialForm, testimonial_text: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                <select
                  value={testimonialForm.rating}
                  onChange={(e) => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="testimonial-active"
                  checked={testimonialForm.active}
                  onChange={(e) => setTestimonialForm({...testimonialForm, active: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="testimonial-active" className="text-sm font-medium text-gray-300">Active Testimonial</label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex space-x-4">
              <button
                onClick={saveTestimonial}
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                <Save className="w-5 h-5 inline mr-2" />
                {editingItem ? 'Update Testimonial' : 'Create Testimonial'}
              </button>
              <button
                onClick={() => setShowTestimonialModal(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 inline mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}