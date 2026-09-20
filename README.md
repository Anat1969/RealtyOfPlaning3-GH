# שלוש אמיתות במתח

אפליקציית תוכן (React + Vite) המתארחת באופן עצמאי ב-GitHub Pages.
האפליקציה **אינה תלויה עוד ב-Base44** — כל התוכן מובנה בקוד (`src/constants/`) והיא רצה כאתר סטטי ללא צורך בשרת או בהתחברות.

## כתובת האפליקציה

https://anat1969.github.io/RealtyOfPlaning3-GH/

## הרצה מקומית

```bash
npm install
npm run dev
```

## בנייה

```bash
npm run build      # פלט לתיקיית dist/
npm run preview    # תצוגה מקדימה של הבנייה
```

## פריסה (Deployment)

הפריסה אוטומטית: כל דחיפה (push) לענף `main` מפעילה GitHub Actions
(`.github/workflows/deploy.yml`) שבונה את האפליקציה ומפרסם אותה ל-GitHub Pages.

> הערה: `base` ב-`vite.config.js` מוגדר ל-`/RealtyOfPlaning3-GH/` כדי להתאים לנתיב של GitHub Pages.
> אם שם הריפוזיטורי משתנה — יש לעדכן ערך זה בהתאם.
