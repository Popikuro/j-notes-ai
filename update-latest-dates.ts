import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey
);

async function main() {
    console.log("Updating Naruto article to Feb 23...");
    const res1 = await supabase.from("articles").update({ published_at: '2026-02-23T00:00:00.000Z' }).eq("slug", "nindo-naruto-way-of-the-ninja");
    if (res1.error) console.error(res1.error);

    console.log("Updating Demon Slayer article to Feb 24...");
    const res2 = await supabase.from("articles").update({ published_at: '2026-02-24T00:00:00.000Z' }).eq("slug", "demon-slayer-kokoro-wo-moyase-shimei");
    if (res2.error) console.error(res2.error);

    console.log("Updates complete.");
}
main();
