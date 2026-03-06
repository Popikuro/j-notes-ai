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
    const { data: articles, error } = await supabase.from("articles").select("*").eq("slug", "yaoyorozu-no-kami-japanese-animism");
    if (error) { console.error("Error:", error); return; }
    if (!articles || articles.length === 0) { console.error("Article not found!"); return; }
    const article = articles[0];
    fs.writeFileSync("yaoyorozu.md", article.content);
    console.log("Wrote article content to yaoyorozu.md");
}
main();
