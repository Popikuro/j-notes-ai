import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey
);

async function main() {
    const { data: articles, error } = await supabase.from("articles").select("id, title, slug, published, created_at, content");
    if (error) { console.error("Error:", error); return; }
    console.log("Total articles:", articles?.length);
    articles?.forEach(a => {
        console.log(`Title: ${a.title}`);
        console.log(`Slug: ${a.slug}`);
    });
}
main();
