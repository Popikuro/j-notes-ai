import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey
);

async function main() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('slug, title, published_at, content')
        .gte('published_at', '2026-03-01')
        .order('published_at', { ascending: true });

    if (error) {
        console.error('Error fetching articles:', error);
    } else {
        articles.forEach(a => {
            console.log(`\n\n--- ${a.published_at?.split('T')[0]} : ${a.slug} ---`);
            console.log(a.content.substring(0, 300) + '...');
        });
    }
}
main();
