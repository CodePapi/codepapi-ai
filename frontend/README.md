## Adding More Languages

If you'd like to add new programming languages or framework migration presets to the UI, edit `frontend/src/constants/languages.ts`. The file exports two arrays: `LANGUAGES` (regular languages/options) and `MIGRATIONS` (framework-specific migration presets). Follow these guidelines:

- File location: `frontend/src/constants/languages.ts`
- Each language entry should include at least `id` and `name`.
- Migration presets may include `id`, `name`, and any additional metadata your application uses.

Example entries:

```ts
// frontend/src/constants/languages.ts
export const LANGUAGES = [
	{ id: 'javascript', name: 'JavaScript' },
	{ id: 'typescript', name: 'TypeScript' },
	{ id: 'python', name: 'Python' },
	// Add more languages here
];

export const MIGRATIONS = [
	{ id: 'react-ts', name: 'React (Class) → React (TS)' },
	{ id: 'react-vue', name: 'React → Vue' },
	// Add more migration presets here
];
```

Tips:

- Keep `id` values unique and use kebab-case (e.g. `react-ts`, `node-express`).
- If you add new migration presets, ensure the backend conversion logic (if any) recognizes the `id` and maps it to the proper prompt behavior.
- After editing `languages.ts`, the `LanguageSelector` and other UI components will automatically include your new items.
- You can add additional metadata (for example `editorMode`, `fileExtension`, or `isMigration`) if you want the UI or backend to handle the language differently — just update the consuming code accordingly.

If you want help wiring up a more complex metadata format, tell me which fields you'd like and I can update the types and components for you.

