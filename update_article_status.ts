import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey
);

async function main() {
    const titles = ['%Gochisosama%', '%Itadakimasu%', '%Yaoyorozu%'];

    for (const title of titles) {
        const { data, error } = await supabase
            .from('articles')
            .update({ published: true })
            .ilike('title', title)
            .select('title, published');

        if (error) {
            console.error(`Error updating articles matching ${title}:`, error);
        } else {
            console.log(`Updated for ${title}:`, data);
        }
    }
}
main();
