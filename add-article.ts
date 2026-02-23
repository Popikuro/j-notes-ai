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
    const content = fs.readFileSync('./mottainai.md', 'utf-8');

    const articleData = {
        title: "Mottainai: The Deep Respect for All Things",
        slug: "mottainai-philosophy",
        excerpt: "An insightful look into the Japanese philosophy of zero waste and reverence for the spirit in all things.",
        content: content,
        published: true,
    };

    // Find or create category
    let categoryId = null;
    const catName = "Philosophy";

    const { data: existingCat } = await supabase
        .from("categories")
        .select("id")
        .ilike("name", catName)
        .maybeSingle();

    if (existingCat) {
        categoryId = existingCat.id;
    } else {
        const { data: newCat } = await supabase
            .from("categories")
            .insert([{ name: catName, slug: "philosophy" }])
            .select("id")
            .single();
        if (newCat) categoryId = newCat.id;
    }

    if (categoryId) {
        Object.assign(articleData, { category_id: categoryId });
    }

    const { data: existingArticle } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", articleData.slug)
        .maybeSingle();

    if (existingArticle) {
        const { error } = await supabase.from("articles").update(articleData).eq("id", existingArticle.id);
        if (error) console.error("Error updating:", error);
        else console.log("Updated existing article successfully.");
    } else {
        const { error } = await supabase.from("articles").insert([articleData]);
        if (error) console.error("Error inserting:", error);
        else console.log("Inserted new article successfully.");
    }
}

main();
