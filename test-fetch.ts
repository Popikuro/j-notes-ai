import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testFetch() {
    const { data: allArticles } = await supabase.from("articles").select("slug");
    console.log("All slugs:", allArticles);

    if (allArticles && allArticles.length > 0) {
        const testSlug = allArticles[0].slug;
        console.log(`Testing fetch for slug: ${testSlug}`);
        const { data, error } = await supabase
            .from("articles")
            .select("*, categories(name)")
            .eq("slug", testSlug)
            .single();

        console.log("Data:", data);
        console.log("Error:", error);
    }
}

testFetch();
