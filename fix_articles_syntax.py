with open('src/data/thoughtArticles.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add comma on line 638
content = content.replace("집중하십시오.'\n  }\n\n  {", "집중하십시오.'\n  },\n\n  {")

# Fix unescaped single quotes in new articles
content = content.replace("'대지지분(평수)'", "\"대지지분(평수)\"")
content = content.replace("'일반분양 물량'", "\"일반분양 물량\"")
content = content.replace("'통합 재건축'", "\"통합 재건축\"")
content = content.replace("'진짜 집주인 사정 급매물'", "\"진짜 집주인 사정 급매물\"")
content = content.replace("'압도적 상급지 입지'", "\"압도적 상급지 입지\"")
content = content.replace("'일시적 1세대 2주택'", "\"일시적 1세대 2주택\"")
content = content.replace("'규모의 경제'", "\"규모의 경제\"")
content = content.replace("'환금성의 차이'", "\"환금성의 차이\"")

with open('src/data/thoughtArticles.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed syntax in thoughtArticles.ts.')
