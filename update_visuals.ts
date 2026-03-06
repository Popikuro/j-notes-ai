import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey
);

async function main() {
    const updates = [
        { slug: 'wabi-sabi-japanese-aesthetic-imperfection', image: '/article_visual_2026-03-01.png', alt: 'Osushi-chan in a digital void with floating Kanji representing Wabi-Sabi' },
        { slug: 'yaoyorozu-no-kami-japanese-animism', image: '/article_visual_2026-03-02.png', alt: 'Osushi-chan in high-tech Zazen posture with blue data-light representing Yaoyorozu' },
        { slug: 'aizuchi-japanese-art-of-listening', image: '/article_visual_2026-03-03.png', alt: 'Osushi-chan looking at a digital sunrise representing Aizuchi' },
        { slug: 'omotenashi-japanese-selfless-hospitality', image: '/article_visual_2026-03-04.png', alt: 'Osushi-chan offering a glowing cyber tea cup representing Omotenashi' },
        { slug: 'kaizen-toyota-way-continuous-improvement', image: '/article_visual_2026-03-05.png', alt: 'Osushi-chan forging glowing neon gears representing Kaizen' }
    ];

    for (const update of updates) {
        const { data: article } = await supabase.from('articles').select('content').eq('slug', update.slug).single();
        if (article) {
            if (!article.content.includes(update.image)) {
                const imageHtml = `\n\n![${update.alt}](${update.image}?v=1)\n\n`;
                const newContent = imageHtml + article.content;
                const { error } = await supabase.from('articles').update({ content: newContent }).eq('slug', update.slug);
                if (error) console.error(`Error updating ${update.slug}:`, error);
                else console.log(`Updated ${update.slug} successfully.`);
            } else {
                console.log(`${update.slug} already has the image.`);
            }
        }
    }
}
main();
