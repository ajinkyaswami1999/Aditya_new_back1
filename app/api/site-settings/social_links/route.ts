// import { siteSettingsApi } from '@/lib/data-manager';

// // Disable caching for admin changes
// export const revalidate = 0;

// export async function GET() {
//   try {
//     console.log(`[API] Loading site setting: social_links`);
//     const setting = await siteSettingsApi.get('social_links');
//     console.log(`[API] Successfully loaded social_links from database:`, setting);
//     return Response.json(setting, {
//       headers: {
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//       }
//     });
//   } catch (error) {
//     console.error(`[API] Failed to fetch site setting social_links:`, error);
    
//     // Return fallback social links instead of error
//     const fallbackSocialLinks = {
//       facebook: "https://facebook.com/26asdesign",
//       instagram: "https://instagram.com/26asdesign",
//       twitter: "https://twitter.com/26asdesign",
//       youtube: "https://youtube.com/@26asdesign",
//       linkedin: "https://linkedin.com/company/26asdesign",
//       behance: "https://behance.net/26asdesign"
//     };
    
//     console.log(`[API] Using fallback social_links:`, fallbackSocialLinks);
//     return Response.json(fallbackSocialLinks, {
//       headers: {
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//       }
//     });
//   }
// }

import { siteSettingsApi } from '@/lib/data-manager';

// Disable caching for admin changes
export const revalidate = 0;

export async function GET() {
  try {
    console.log(`[API] Loading site setting: social_links`);
    const setting = await siteSettingsApi.get('social_links');
    console.log(`[API] Successfully loaded social_links from database:`, setting);
    return Response.json(setting, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error(`[API] Failed to fetch site setting social_links:`, error);

    // Return fallback social links instead of error
    const fallbackSocialLinks = {
      facebook: "https://facebook.com/26asdesign",
      instagram: "https://instagram.com/26asdesign",
      twitter: "https://twitter.com/26asdesign",
      youtube: "https://youtube.com/@26asdesign",
      linkedin: "https://linkedin.com/company/26asdesign",
      behance: "https://behance.net/26asdesign"
    };

    console.log(`[API] Using fallback social_links:`, fallbackSocialLinks);
    return Response.json(fallbackSocialLinks, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}

// ✅ Add PUT handler for updates
export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    console.log(`[API] Updating social_links with:`, body);

    await siteSettingsApi.set('social_links', body);

    return Response.json({ success: true, updated: body });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[API] Failed to update social_links:`, error.message);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }

    console.error(`[API] Failed to update social_links: Unknown error`, error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unknown error' }),
      { status: 500 }
    );
  }
}
