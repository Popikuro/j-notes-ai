const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const { data: article } = await supabase.from('articles')
        .select('content')
        .eq('slug', 'the-art-of-japanese-bow-ojigi')
        .single();
    
    if (!article) {
        console.error("Article not found!");
        return;
    }

    let content = article.content;
    const headerToFind = "## The Three Degrees of Respect";
    const cacheBusterImage = "\n\n![Osushi-chan Bowing Guide](/osushi-bowing-guide.png?v=2)\n";
    const oldImage = "![Osushi-chan Bowing Guide](/osushi-bowing-guide.png)";

    // First, remove old instances
    content = content.replace(/\n\n\!\[Osushi-chan Bowing Guide\].*?\n/g, "");

    // Inject fresh
    content = content.replace(headerToFind, headerToFind + cacheBusterImage);
    
    await supabase.from('articles').update({ content }).eq('slug', 'the-art-of-japanese-bow-ojigi');
    console.log("Image force injected with cache buster ?v=2.");
}
run();
