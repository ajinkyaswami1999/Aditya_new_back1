@@ .. @@
 
 ## 🚀 Quick Setup
 
-### Option 1: Local Development (JSON File)
-The project works out of the box with a JSON file for data storage.
-
-### Option 2: Production with Supabase (Recommended)
+### Production Setup with Supabase
 
 1. **Create Supabase Project:**
    - Go to [supabase.com](https://supabase.com)
@@ .. @@
 
 ## 🎯 Features
 
-- **🔄 Automatic Fallback:** Uses Supabase when available, falls back to JSON file locally
+- **🔄 Automatic Fallback:** Uses Supabase when available, falls back to demo data when not connected
 - **🔐 Secure Admin Panel:** Role-based authentication with proper permissions
 - **📱 Responsive Design:** Works perfectly on all devices
 - **⚡ Fast Performance:** Optimized for speed and SEO
@@ .. @@
 
 ## 📁 Project Structure
 
- `lib/data-manager.ts` - Data management with Supabase integration and demo fallback
- `lib/supabase-client.ts` - Client-side Supabase configuration (public anon key)
- `lib/supabase-server.ts` - Server-side Supabase configuration (service role key)
 - `lib/supabase.ts` - Supabase client configuration
 - `lib/database.ts` - Database schema and utilities
-- `lib/data-manager.ts` - Data management layer
 - `app/admin/` - Admin panel pages
 - `components/` - Reusable React components
 - `app/api/` - API routes for data operations