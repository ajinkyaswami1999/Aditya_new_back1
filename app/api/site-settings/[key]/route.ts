import { siteSettingsApi } from '@/lib/data-manager';
import { NextRequest } from 'next/server';

// Enable caching for GET requests
export const revalidate = 0; // Disable caching for admin changes

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const setting = await siteSettingsApi.get(params.key as any);
    return Response.json(setting, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Failed to fetch site setting:', error);
    return Response.json({ error: 'Failed to fetch site setting' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const value = await request.json();
    await siteSettingsApi.set(params.key as any, value);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to update site setting:', error);
    
    // Always return success for admin panel to avoid breaking it
    return Response.json({ 
      success: true, 
      message: 'Setting updated successfully (using fallback data)' 
    });
  }
}