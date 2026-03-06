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
        .select('slug, title, published_at')
        .order('published_at', { ascending: false })
        .limit(15);

    if (error) {
        console.error('Error fetching articles:', error);
    } else {
        console.log('Recent articles:');
        articles.forEach(a => console.log(`- ${a.published_at?.split('T')[0]}: ${a.slug} (${a.title})`));
    }
}
main();
