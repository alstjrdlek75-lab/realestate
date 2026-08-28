import json

with open('src/data/thoughtArticles.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Let's inspect where unescaped multi-line single quotes occurred
# The safest and cleanest way is to use clean template strings or single-line escaped strings
# Let's rewrite the thoughtArticles.ts with clean formatting

with open('add_new_articles.py', 'r', encoding='utf-8') as f:
    script_content = f.read()

