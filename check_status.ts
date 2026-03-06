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
        .select('slug, title, published');

    if (error) {
        console.error('Error fetching articles:', error);
    } else {
        console.log('All articles:');
        articles.forEach(a => console.log(`- ${a.slug}: ${a.published} (${a.title})`));
    }
}
main();
