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
    const injection = "\n\n![Osushi-chan Bowing Guide](/osushi-bowing-guide.png)\n";
    
    // Check if it already has the image
    if (!content.includes('osushi-bowing-guide.png')) {
        content = content.replace(headerToFind, headerToFind + injection);
        await supabase.from('articles').update({ content }).eq('slug', 'the-art-of-japanese-bow-ojigi');
        console.log("Image injected successfully.");
    } else {
        console.log("Image already injected.");
    }
}
run();
