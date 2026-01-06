#!/bin/bash

echo "=== ТЕСТ ПРОЕКТА ==="
echo "1. Проверяем запуск проекта..."
npm start -- --version 2>&1 | head -5

echo -e "\n2. Проверяем сборку..."
npm run build 2>&1 | tail -5

echo -e "\n3. Проверяем наличие ключевых файлов..."
required_files=(
  "src/index.tsx"
  "src/components/article-params-form/ArticleParamsForm.tsx"
  "src/contexts/ArticleContext.tsx"
  "src/components/article/Article.module.scss"
)

for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file существует"
  else
    echo "✗ $file не найден"
  fi
done

echo -e "\n4. Проверяем CSS переменные..."
if grep -q "CSSProperties" src/index.tsx && grep -q "var(--" src/components/article/Article.module.scss; then
  echo "✓ CSS переменные настроены"
else
  echo "✗ Проблема с CSS переменными"
fi

echo -e "\n5. Проверяем UI компоненты..."
ui_components=("Select" "RadioGroup" "Button" "ArrowButton")
for comp in "${ui_components[@]}"; do
  if grep -q "import.*$comp" src/components/article-params-form/ArticleParamsForm.tsx; then
    echo "✓ $comp используется"
  else
    echo "✗ $comp не используется"
  fi
done

echo -e "\n=== ТЕСТ ЗАВЕРШЕН ==="
