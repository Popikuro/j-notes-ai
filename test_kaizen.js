const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
    const { data } = await supabase.from('articles').select('content').eq('slug', 'kaizen-toyota-way-continuous-improvement').single();
    if (data) {
        console.log(JSON.stringify(data.content));
    }
}
main();
