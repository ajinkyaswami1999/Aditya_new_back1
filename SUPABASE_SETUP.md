# 🗄️ Supabase Database Setup Guide

Complete setup guide for 26AS Design Studio Supabase database with all tables, policies, and sample data.

## 📋 Quick Setup Checklist

- [ ] Create Supabase project
- [ ] Run 6 SQL migrations in order
- [ ] Copy environment variables
- [ ] Test database connection
- [ ] Verify admin panel access

## 🚀 Step-by-Step Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub/Google
4. Click "New Project"
5. Choose organization and enter:
   - **Project Name**: `26as-design-studio`
   - **Database Password**: (generate strong password)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for project to be ready (~2 minutes)

### 2. Run Database Migrations

Go to your Supabase project dashboard → **SQL Editor** → **New Query**

Copy and paste each SQL file content into the SQL Editor and run them **in this exact order**:

#### Step 1: Create Projects Table
```sql
-- Copy and paste content from: supabase/migrations/create_projects_table.sql
-- Click "Run" button
```

#### Step 2: Create Team Members Table
```sql
-- Copy and paste content from: supabase/migrations/create_team_members_table.sql
-- Click "Run" button
```

#### Step 3: Create Testimonials Table
```sql
-- Copy and paste content from: supabase/migrations/create_testimonials_table.sql
-- Click "Run" button
```

#### Step 4: Create Admin Users Table
```sql
-- Copy and paste content from: supabase/migrations/create_admin_users_table.sql
-- Click "Run" button
```

#### Step 5: Create Site Settings Table
```sql
-- Copy and paste content from: supabase/migrations/create_site_settings_table.sql
-- Click "Run" button
```

#### Step 6: Insert Sample Data
```sql
-- Copy and paste content from: supabase/migrations/insert_sample_data.sql
-- Click "Run" button
```

### 3. Get Environment Variables

After creating your project, go to:
**Settings → API → Project API keys**

Copy these values:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

### 4. Update Environment Variables

Create `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 🗄️ Database Schema Overview

### 📊 Tables Created:

#### 1. **projects** - Portfolio projects
- ✅ Public read access (anyone can view)
- ✅ Service role write access (admin operations)
- ✅ Featured projects support
- ✅ Image galleries support

#### 2. **team_members** - Team information
- ✅ Public read access for active members
- ✅ Service role write access
- ✅ Sort ordering support
- ✅ Social links support

#### 3. **testimonials** - Client reviews
- ✅ Public read access for active testimonials
- ✅ Service role write access
- ✅ Rating system (1-5 stars)
- ✅ Project linking support

#### 4. **admin_users** - Admin authentication
- ✅ Service role access only (secure)
- ✅ Role-based permissions
- ✅ Password authentication
- ✅ Activity tracking

#### 5. **site_settings** - Website configuration
- ✅ Public read access
- ✅ Service role write access
- ✅ JSON data storage
- ✅ Key-value structure

## 🔐 Security Policies (RLS)

### ✅ **Row Level Security Enabled** on all tables

### 🌐 **Public Access Policies:**
- **Projects**: Anyone can read all projects
- **Team Members**: Anyone can read active team members
- **Testimonials**: Anyone can read active testimonials
- **Site Settings**: Anyone can read all settings

### 🔒 **Admin Access Policies:**
- **Service Role**: Full CRUD access to all tables
- **Admin Users**: Only service role can access (secure authentication)

### 🛡️ **Security Features:**
- ✅ **No direct admin user access** - Only through service role
- ✅ **Public data is read-only** - No unauthorized modifications
- ✅ **Proper data validation** - Constraints and checks
- ✅ **Indexed for performance** - Fast queries

## 📝 Sample Data Included

### 🏗️ **3 Featured Projects:**
- Modern Villa Residence (Residential)
- Corporate Headquarters (Commercial)
- Luxury Penthouse (Residential)

### 👥 **3 Team Members:**
- Alex Rodriguez (Principal Architect)
- Sarah Kim (Design Director)
- Michael Chen (Project Manager)

### ⭐ **3 Testimonials:**
- 5-star reviews from satisfied clients
- Linked to respective projects

### 🔧 **2 Admin Users:**
- **superadmin** / **super123** (Full access)
- **admin** / **admin123** (Limited access)

### ⚙️ **Site Settings:**
- Statistics (projects completed, years experience, etc.)
- Contact information
- Social media links
- Hero slider content

## 🎯 Testing Your Setup

### 1. **Test Database Connection:**
Visit your website - it should load projects, team members, and testimonials from Supabase.

### 2. **Test Admin Panel:**
1. Go to `/admin/login`
2. Login with: `superadmin` / `super123`
3. Try creating/editing projects
4. Verify changes appear on the website

### 3. **Test Fallback System:**
1. Temporarily change environment variables to invalid values
2. Website should still work with demo data
3. Admin panel should still function

## 🚨 Important Notes

### 🔐 **Security:**
- **Never expose service role key** in client-side code
- **Use anon key only** for client-side operations
- **Service role key** should only be in server environment variables

### 🎯 **Performance:**
- All tables have proper indexes
- RLS policies are optimized
- Caching is enabled on API routes

### 🔄 **Backup:**
- Supabase automatically backs up your database
- You can export data anytime from the dashboard
- Migration files serve as version control

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] All 6 SQL migrations executed successfully
- [ ] Environment variables added to `.env.local`
- [ ] Website loads with Supabase data
- [ ] Admin login works with demo credentials
- [ ] Can create/edit projects from admin panel
- [ ] Changes reflect on public website
- [ ] Fallback system works when Supabase is disconnected

## 🆘 Troubleshooting

### **Migration Errors:**
- Run migrations in exact order shown above
- Check for typos in SQL code
- Ensure previous migration completed successfully

### **Connection Issues:**
- Verify environment variables are correct
- Check Supabase project is active
- Confirm API keys are copied correctly

### **Admin Panel Issues:**
- Try demo credentials: `superadmin` / `super123`
- Check browser console for errors
- Verify admin_users table was created

### **Data Not Loading:**
- Check browser network tab for API errors
- Verify RLS policies are applied correctly
- Confirm sample data was inserted

## 🎉 Success!

**Your 26AS Design Studio is now fully connected to Supabase!**

- ✅ **5 Database tables** with proper relationships
- ✅ **Row Level Security** protecting your data
- ✅ **Sample data** ready for testing
- ✅ **Admin authentication** working
- ✅ **Fallback system** for reliability
- ✅ **Production-ready** setup

**Demo Credentials:**
- Super Admin: `superadmin` / `super123`
- Admin: `admin` / `admin123`

Your architecture and design studio website is ready to go live! 🚀