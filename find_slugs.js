const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const { data, error } = await supabase.from('articles').select('slug, title, id').like('title', '%Otsukare%');
    console.log("Otsukaresama:", data, error);
    
    const { data: d2, error: e2 } = await supabase.from('articles').select('slug, title, id').like('title', '%Meishi%');
    console.log("Meishi:", d2, e2);
}
run();
