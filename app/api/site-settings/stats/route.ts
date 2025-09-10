import { siteSettingsApi } from '@/lib/data-manager';
import { NextRequest } from 'next/server';

// Disable caching for admin changes
export const revalidate = 0;

export async function GET() {
  try {
    console.log(`[API] Loading site setting: stats`);
    const setting = await siteSettingsApi.get('stats');
    console.log(`[API] Successfully loaded stats from database:`, setting);
    return Response.json(setting, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error(`[API] Failed to fetch site setting stats:`, error);
    
    // Return fallback stats instead of error
    const fallbackStats = {
      projectsCompleted: 150,
      yearsExperience: 12,
      happyClients: 200,
      successRate: 95
    };
    
    console.log(`[API] Using fallback stats:`, fallbackStats);
    return Response.json(fallbackStats, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const value = await request.json();
    console.log(`[API] Updating site setting: stats`, value);
    console.log(`[API] Request body received:`, JSON.stringify(value, null, 2));
    
    await siteSettingsApi.set('stats', value);
    console.log(`[API] Successfully updated stats in database`);
    
    return Response.json({ 
      success: true, 
      message: `Successfully updated stats`,
      data: value 
    });
  } catch (error) {
    console.error(`[API] Failed to update site setting stats:`, error);
    
    // Return actual error instead of fake success
    return Response.json({ 
      error: `Failed to update site setting: ${error instanceof Error ? error.message : 'Unknown error'}`,
      success: false
    }, { status: 500 });
  }
}