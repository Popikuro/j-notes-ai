-- Run this in your Supabase SQL Editor

-- Create the categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure articles table has a foreign key to categories
-- (If category_id already exists, just add the constraint. If not, add the column too)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = 'articles' AND tc.constraint_type = 'FOREIGN KEY' AND kcu.column_name = 'category_id'
    ) THEN
        ALTER TABLE public.articles
        ADD CONSTRAINT articles_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Enable RLS (if needed) but allow public read
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Allow authenticated users to insert categories
CREATE POLICY "Authenticated users can insert categories" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- Alternatively, if you are relying on anon key without logging in for admin access, use this temporarily:
-- CREATE POLICY "Anon users can insert categories" ON public.categories FOR INSERT WITH CHECK (true);
