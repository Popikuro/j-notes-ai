import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey
);

async function main() {
    const { error } = await supabase.from("articles").update({ published_at: '2026-02-23T00:00:00.000Z' }).eq("slug", "nindo-naruto-way-of-the-ninja");
    if (error) { console.error("Error updating", error); return; }
    console.log("Updated Naruto article published_at to 2026-02-23.");
}
main();
