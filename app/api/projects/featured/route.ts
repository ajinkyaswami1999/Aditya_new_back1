import { projectsApi } from '@/lib/data-manager';

// Enable caching for GET requests
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const projects = await projectsApi.getFeatured();
    return Response.json(projects, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return Response.json({ error: 'Failed to fetch featured projects' }, { status: 500 });
  }
}