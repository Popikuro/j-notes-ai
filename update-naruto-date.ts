import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey
);

async function main() {
    // Check if published_at column exists, if not, create it.
    // However Supabase Data API cannot execute ALTER TABLE directly. 
    // We will use SQL execution if we have a way, or just update the object.
    // Supabase allows dynamic JSON but we need to see if published_at is a column or if we should just update created_at manually.
    const { error } = await supabase.from("articles").update({ created_at: '2026-02-23T00:00:00.000Z' }).eq("slug", "nindo-naruto-way-of-the-ninja");
    if (error) { console.error("Error updating", error); return; }
    console.log("Updated Naruto article created_at to 2026-02-23.");
}
main();
