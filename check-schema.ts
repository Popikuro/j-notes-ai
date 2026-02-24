import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkSchema() {
    console.log("Categories:");
    const { data: catData, error: catError } = await supabase.from("categories").select("*");
    console.log(catError ? catError : catData);

    console.log("Articles (id, title, category_id):");
    const { data: artData, error: artError } = await supabase.from("articles").select("id, title, category_id");
    console.log(artError ? artError : artData);
}

checkSchema();
