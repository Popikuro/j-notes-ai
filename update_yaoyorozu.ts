import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey
);

async function main() {
    const newContent = fs.readFileSync('yaoyorozu.md', 'utf-8');
    const { data, error } = await supabase
        .from('articles')
        .update({ content: newContent })
        .eq('slug', 'yaoyorozu-no-kami-japanese-animism');
    if (error) {
        console.error('Error updating article:', error);
    } else {
        console.log('Successfully updated article!');
    }
}
main();
