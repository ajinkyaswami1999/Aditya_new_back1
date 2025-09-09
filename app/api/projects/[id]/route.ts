import { projectsApi } from '@/lib/data-manager';
import { NextRequest } from 'next/server';

// Enable caching for GET requests
export const revalidate = 60; // Cache for 60 seconds

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await projectsApi.getById(params.id);
    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    return Response.json(project, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return Response.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const updatedProject = await projectsApi.update(params.id, updates);
    return Response.json(updatedProject);
  } catch (error) {
    console.error('Failed to update project:', error);
    return Response.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await projectsApi.delete(params.id);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return Response.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}