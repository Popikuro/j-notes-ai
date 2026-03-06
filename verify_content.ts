import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey
);

async function main() {
    const slugs = [
        'wabi-sabi-japanese-aesthetic-imperfection',
        'yaoyorozu-no-kami-japanese-animism',
        'aizuchi-japanese-art-of-listening',
        'omotenashi-japanese-selfless-hospitality',
        'kaizen-toyota-way-continuous-improvement'
    ];

    for (const slug of slugs) {
        const { data: article } = await supabase.from('articles').select('content').eq('slug', slug).single();
        if (article) {
            console.log(`\n--- ${slug} ---`);
            const first150 = article.content.substring(0, 150);
            console.log(first150.replace(/\n/g, '\\n'));
        }
    }
}
main();
