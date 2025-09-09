import { teamMembersApi } from '@/lib/data-manager';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamMembers = await teamMembersApi.getAll();
    const member = teamMembers.find(m => m.id === params.id);
    if (!member) {
      return Response.json({ error: 'Team member not found' }, { status: 404 });
    }
    return Response.json(member);
  } catch (error) {
    console.error('Failed to fetch team member:', error);
    return Response.json({ error: 'Failed to fetch team member' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const updatedMember = await teamMembersApi.update(params.id, updates);
    return Response.json(updatedMember);
  } catch (error) {
    console.error('Failed to update team member:', error);
    return Response.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await teamMembersApi.delete(params.id);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to delete team member:', error);
    return Response.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}