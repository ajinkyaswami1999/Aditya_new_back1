import { siteSettingsApi } from '@/lib/data-manager';

// Disable caching for admin changes
export const revalidate = 0;

export async function GET() {
  try {
    console.log(`[API] Loading site setting: contact_info`);
    const setting = await siteSettingsApi.get('contact_info');
    console.log(`[API] Successfully loaded contact_info from database:`, setting);
    return Response.json(setting, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error(`[API] Failed to fetch site setting contact_info:`, error);
    
    // Return fallback contact info instead of error
    const fallbackContactInfo = {
      address: "123 Design Street, Suite 456, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "info@26asdesign.com"
    };
    
    console.log(`[API] Using fallback contact_info:`, fallbackContactInfo);
    return Response.json(fallbackContactInfo, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}