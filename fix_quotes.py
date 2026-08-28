with open('src/components/RealEstateFuture.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any unescaped single quotes inside string literals
content = content.replace("'SK그룹 1조원 투자 'SK그린테크노캠퍼스' 고소득 연구원 직주근접'", "'SK그룹 1조원 투자 \"SK그린테크노캠퍼스\" 고소득 연구원 직주근접'")
content = content.replace("포스코이앤씨 하이엔드 브랜드 '오티에르' 적용", "포스코이앤씨 하이엔드 브랜드 \"오티에르\" 적용")

with open('src/components/RealEstateFuture.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed quotes.')
