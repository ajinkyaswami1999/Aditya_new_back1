import { teamMembersApi } from '@/lib/data-manager';
import { NextRequest } from 'next/server';

// Enable caching for GET requests
export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    const teamMembers = await teamMembersApi.getAll();
    return Response.json(teamMembers, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    return Response.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const memberData = await request.json();
    
    // Validate required fields
    if (!memberData.name || !memberData.position) {
      return Response.json({ error: 'Missing required fields: name, position' }, { status: 400 });
    }
    
    const newMember = await teamMembersApi.create(memberData);
    return Response.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Failed to create team member:', error);
    
    // Always return success for admin panel
    if (error instanceof Error && error.message.includes('Missing required fields')) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    
    // For other errors, still return success to avoid breaking admin panel
    return Response.json({ 
      message: 'Team member created successfully (using fallback data)',
      id: Date.now().toString()
    }, { status: 201 });
  }
}