import { supabaseAdmin, supabaseServerClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    console.log('Testing Supabase connection in production...');
    
    // Log environment status
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      urlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)
    });
    
    // Test basic connection
    if (!supabaseServerClient) {
      return Response.json({ 
        error: 'Supabase client not configured - missing environment variables',
        configured: false,
        debug: {
          hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
        }
      }, { status: 500 });
    }

    // Test read access
    const { data: projects, error: readError } = await supabaseServerClient
      .from('projects')
      .select('count')
      .limit(1);

    if (readError) {
      return Response.json({ 
        error: 'Read test failed', 
        details: readError,
        configured: true,
        readAccess: false
      }, { status: 500 });
    }

    // Test admin write access
    if (!supabaseAdmin) {
      return Response.json({ 
        error: 'Supabase admin client not configured',
        configured: true,
        readAccess: true,
        adminAccess: false
      }, { status: 500 });
    }

    // Test admin connection (don't actually insert, just test the connection)
    const { error: adminError } = await supabaseAdmin
      .from('projects')
      .select('count')
      .limit(1);

    if (adminError) {
      return Response.json({ 
        error: 'Admin access test failed', 
        details: adminError,
        configured: true,
        readAccess: true,
        adminAccess: false
      }, { status: 500 });
    }

    return Response.json({ 
      success: true,
      configured: true,
      readAccess: true,
      adminAccess: true,
      message: 'Supabase connection is working properly'
    });

  } catch (error) {
    console.error('Connection test error:', error);
    return Response.json({ 
      error: 'Connection test failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}