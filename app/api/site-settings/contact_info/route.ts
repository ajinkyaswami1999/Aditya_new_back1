// import { siteSettingsApi } from '@/lib/data-manager';

// // Disable caching for admin changes
// export const revalidate = 0;

// export async function GET() {
//   try {
//     console.log(`[API] Loading site setting: contact_info`);
//     const setting = await siteSettingsApi.get('contact_info');
//     console.log(`[API] Successfully loaded contact_info from database:`, setting);
//     return Response.json(setting, {
//       headers: {
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//       }
//     });
//   } catch (error) {
//     console.error(`[API] Failed to fetch site setting contact_info:`, error);
    
//     // Return fallback contact info instead of error
//     const fallbackContactInfo = {
//       address: "E-35 Karni Nagar, Lalgarh, Bikaner, 334001",
//       phone: "+1 (555) 123-4567",
//       email: "info@26asdesign.com"
//     };
    
//     console.log(`[API] Using fallback contact_info:`, fallbackContactInfo);
//     return Response.json(fallbackContactInfo, {
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

    const fallbackContactInfo = {
      address: "E-35 Karni Nagar, Lalgarh, Bikaner, 334001",
      phone: "+91 6377828824",
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

// ✅ Add PUT handler with proper typing
export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    console.log(`[API] Updating contact_info with:`, body);

    await siteSettingsApi.set('contact_info', body);

    return Response.json({ success: true, updated: body });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[API] Failed to update contact_info:`, error.message);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }

    console.error(`[API] Failed to update contact_info: Unknown error`, error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unknown error' }),
      { status: 500 }
    );
  }
}