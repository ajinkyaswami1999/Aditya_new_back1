import { siteSettingsApi } from '@/lib/data-manager';
import { NextRequest } from 'next/server';

// Disable caching for admin changes
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    console.log(`[API] Loading site setting: ${params.key}`);
    const setting = await siteSettingsApi.get(params.key as any);
    console.log(`[API] Successfully loaded ${params.key}:`, setting);
    return Response.json(setting, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error(`[API] Failed to fetch site setting ${params.key}:`, error);
    
    // Return fallback data instead of error for missing settings
    const fallbackData = {
      stats: {
        projectsCompleted: 150,
        yearsExperience: 12,
        happyClients: 200,
        successRate: 95
      },
      contact_info: {
        address: "123 Design Street, Suite 456, New York, NY 10001",
        phone: "+1 (555) 123-4567",
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
    };
    
    const fallback = (fallbackData as any)[params.key];
    if (fallback) {
      console.log(`[API] Using fallback data for ${params.key}:`, fallback);
      return Response.json(fallback, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }
    
    return Response.json({ 
      error: `Failed to fetch site setting: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const value = await request.json();
    console.log(`[API] Updating site setting: ${params.key}`, value);
    console.log(`[API] Request body received:`, JSON.stringify(value, null, 2));
    
    await siteSettingsApi.set(params.key as any, value);
    console.log(`[API] Successfully updated ${params.key} in database`);
    
    return Response.json({ 
      success: true, 
      message: `Successfully updated ${params.key}`,
      data: value 
    });
  } catch (error) {
    console.error(`[API] Failed to update site setting ${params.key}:`, error);
    
    // Return actual error instead of fake success
    return Response.json({ 
      error: `Failed to update site setting: ${error instanceof Error ? error.message : 'Unknown error'}`,
      success: false
    }, { status: 500 });
  }
}