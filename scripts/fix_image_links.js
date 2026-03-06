const fs = require('fs');
const path = require('path');

const replacements = [
    ['/images/ikigai-visual.png', '/images/ikigai-finding-purpose-in-ai-era/ikigai-visual.png'],
    ['/images/ma-visual.png', '/images/the-art-of-ma-digital-pause/ma-visual.png'],
    ['/ichigo_ichie_cyber_tea.png', '/images/ichigo-ichie-once-in-a-lifetime-meeting/ichigo_ichie_cyber_tea.png'],
    ['/gochisosama_solo_gratitude.png', '/images/gochisosama-thank-you-for-the-meal/gochisosama_solo_gratitude.png'],
    ['/article_visual_2026-03-01.png', '/images/wabi-sabi-japanese-aesthetic-imperfection/article_visual.png'],
    ['/article_visual_2026-03-02.png', '/images/yaoyorozu-no-kami-japanese-animism/article_visual.png'],
    ['/article_visual_2026-03-03.png', '/images/aizuchi-japanese-art-of-listening/article_visual.png'],
    ['/article_visual_2026-03-04.png', '/images/omotenashi-japanese-selfless-hospitality/article_visual.png'],
    ['/article_visual_2026-03-05.png', '/images/kaizen-toyota-way-continuous-improvement/article_visual.png']
];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
                processDir(fullPath);
            }
        } else if (fullPath.endsWith('.md') || fullPath.endsWith('.mdx') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const [oldPath, newPath] of replacements) {
                if (content.includes(oldPath)) {
                    content = content.split(oldPath).join(newPath);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed:', fullPath);
            }
        }
    }
}

processDir(__dirname);
