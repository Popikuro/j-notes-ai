import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testFetch() {
    const { data } = await supabase.from("articles").select("content").eq("slug", "the-magic-word-otsukaresama").single();
    if (data) console.log(data.content);
}
testFetch();
