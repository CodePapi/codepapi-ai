## Adding More Languages

To add new programming languages to the UI, edit `frontend/src/constants/languages.ts`. The file exports a `LANGUAGES` array with supported languages.

- File location: `frontend/src/constants/languages.ts`
- Each language entry should include `id` and `name`

Example:

```ts
// frontend/src/constants/languages.ts
export const LANGUAGES = [
	{ id: 'javascript', name: 'JavaScript' },
	{ id: 'typescript', name: 'TypeScript' },
	{ id: 'python', name: 'Python' },
	// Add more languages here
];
```

Tips:

- Keep `id` values unique and use lowercase (e.g., `javascript`, `python`)
- After editing `languages.ts`, the `LanguageSelector` component automatically includes your new items
- The backend `converter.service.ts` handles the translation prompt for each language

For more complex metadata or customization, check the component prop types in `LanguageSelector.tsx`.

