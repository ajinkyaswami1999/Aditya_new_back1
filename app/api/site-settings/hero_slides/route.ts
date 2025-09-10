import { siteSettingsApi } from '@/lib/data-manager';

// Disable caching for admin changes
export const revalidate = 0;

export async function GET() {
  try {
    console.log(`[API] Loading site setting: hero_slides`);
    const setting = await siteSettingsApi.get('hero_slides');
    console.log(`[API] Successfully loaded hero_slides from database:`, setting);
    return Response.json(setting, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error(`[API] Failed to fetch site setting hero_slides:`, error);
    
    // Return fallback hero slides instead of error
    const fallbackHeroSlides = [
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
    ];
    
    console.log(`[API] Using fallback hero_slides:`, fallbackHeroSlides);
    return Response.json(fallbackHeroSlides, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}