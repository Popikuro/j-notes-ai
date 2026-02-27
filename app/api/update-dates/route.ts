import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: "Missing Supabase credentials in Vercel Edge environment" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const activeSlugs = [
        'the-art-of-japanese-bow-ojigi',
        'the-magic-word-otsukaresama',
        'the-art-of-meishi-more-than-just-a-business-card',
        'demon-slayer-kokoro-wo-moyase-shimei',
        'nindo-naruto-way-of-the-ninja',
        'deciphering-kento-shimasu',
        'komorebi-sunlight-filtering-trees',
        'mottainai',
        'ichigo-ichie-once-in-a-lifetime-meeting'
    ];

    const updates = [];

    // Draft the others
    const draftRes = await supabase.from("articles")
        .update({ published: false })
        .not('slug', 'in', `(${[...activeSlugs, 'itadakimasu-meaning-japanese-gratitude'].join(',')})`)
        .select('slug, title, published');
        
    updates.push({ draftsUpdated: draftRes.data });

    // Itadakimasu
    const itadakimasuTitle = 'Itadakimasu: The Spiritual Gratitude Hidden in Every Japanese Meal [いただきます]';
    const itadakimasuContent = `
Have you ever wondered why Japanese people always put their hands together and say something before they eat? It is more than just "bon appetit."

## The Spirit of the Meal

Before taking the first bite, it is customary to say <ContextDecoder phrase="いただきます" meaning="I humbly receive" context="Said before eating. It shows gratitude to the plants, animals, farmers, and cooks who provided the meal.">Itadakimasu</ContextDecoder>. It acknowledges that you are taking life to sustain your own, and expresses deep gratitude for the entire chain of effort that brought the food to your plate.

## How to Do It Right

1. **Hands Together**: Clasp your hands in a prayer-like position gently in front of your chest.
2. **Bow Slightly**: Lower your head just a fraction.
3. **Say It Clearly**: Just loud enough for your dining partners to hear. 

## Beyond the Table

This concept ties heavily back to *Mottainai* (the regret of waste). Because you have recognized the sacrifice required for the meal, it becomes culturally unacceptable to leave food unfinished. 
    `.trim();

    const itRes = await supabase.from("articles")
        .update({ 
            published: true, 
            published_at: '2026-03-01T08:00:00.000Z',
            title: itadakimasuTitle,
            content: itadakimasuContent
        })
        .eq('slug', 'itadakimasu-meaning-japanese-gratitude')
        .select('slug, title, published_at');
        
    updates.push({ scheduled: itRes.data });

    return NextResponse.json({ success: true, updates });
}
