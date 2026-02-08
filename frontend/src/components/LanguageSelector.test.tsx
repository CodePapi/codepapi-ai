import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LanguageSelector } from './LanguageSelector';

// Mock the constants so our test doesn't depend on the actual language list
vi.mock('../constants/languages', () => ({
  LANGUAGES: [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'typescript', name: 'TypeScript' },
  ],
}));

describe('LanguageSelector Component', () => {
  const mockOnChange = vi.fn();

  it('renders with the correct label', () => {
    render(
      <LanguageSelector
        label="Source Language"
        value=""
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByText('Source Language')).toBeDefined();
  });

  it('displays the correct initial value', () => {
    render(
      <LanguageSelector label="Lang" value="python" onChange={mockOnChange} />,
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('python');
  });

  it('calls onChange when a new language is selected', () => {
    render(
      <LanguageSelector
        label="Lang"
        value="javascript"
        onChange={mockOnChange}
      />,
    );
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'typescript' } });

    expect(mockOnChange).toHaveBeenCalledWith('typescript');
  });

  it('filters out the language provided in excludeId', () => {
    render(
      <LanguageSelector
        label="Target"
        value=""
        onChange={mockOnChange}
        excludeId="javascript" // We shouldn't be able to translate JS to JS
      />,
    );

    // Check that JavaScript is NOT in the document
    const jsOption = screen.queryByText('JavaScript');
    const pythonOption = screen.getByText('Python');

    expect(jsOption).toBeNull();
    expect(pythonOption).toBeDefined();
  });

  it('disables the select when the disabled prop is true', () => {
    render(
      <LanguageSelector
        label="Lang"
        value="javascript"
        onChange={mockOnChange}
        disabled={true}
      />,
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveProperty('disabled', true);
    expect(select.className).toContain('disabled:opacity-50');
  });

  it('associates label with select using the provided id', () => {
    const customId = 'my-custom-select';
    render(
      <LanguageSelector
        label="Select Code"
        value=""
        onChange={mockOnChange}
        id={customId}
      />,
    );

    const label = screen.getByText('Select Code');
    const select = screen.getByRole('combobox');

    expect(label.getAttribute('for')).toBe(customId);
    expect(select.getAttribute('id')).toBe(customId);
  });
});
