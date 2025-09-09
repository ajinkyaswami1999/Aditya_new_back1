import { adminUsersApi } from '@/lib/data-manager';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return Response.json({ error: 'Username and password are required' }, { status: 400 });
    }
    
    const user = await adminUsersApi.authenticate(username, password);
    
    if (user) {
      return Response.json({
        id: user.id,
        username: user.username,
        role: user.role,
        permissions: user.permissions
      });
    } else {
      return Response.json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return Response.json({ error: 'Authentication failed' }, { status: 500 });
  }
}