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
    console.log(`[API] Successfully loaded ${params.key} from database`);
    return Response.json(setting, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error(`[API] Failed to fetch site setting ${params.key}:`, error);
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
    await siteSettingsApi.set(params.key as any, value);
    console.log(`[API] Successfully updated ${params.key} in database`);
    return Response.json({ success: true });
  } catch (error) {
    console.error(`[API] Failed to update site setting ${params.key}:`, error);
    
    // Return actual error instead of fake success
    return Response.json({ 
      error: `Failed to update site setting: ${error instanceof Error ? error.message : 'Unknown error'}`,
      success: false
    }, { status: 500 });
  }
}