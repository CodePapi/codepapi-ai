import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

// 1. Mock Monaco Editor (it's too heavy for JSDOM)
vi.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }: any) => (
    <textarea
      data-testid="monaco-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  DiffEditor: ({ modified }: any) => (
    <div data-testid="diff-editor">{modified}</div>
  ),
}));

// 2. Mock API Client
vi.mock('./api/client', () => ({
  translateCode: vi.fn(),
  reviewCode: vi.fn(),
  fixBugs: vi.fn(),
}));

// 3. Mock Child Components that were already tested
vi.mock('./components/LanguageSelector', () => ({
  LanguageSelector: ({ label, onChange }: any) => (
    <div>
      <label>{label}</label>
      <select
        onChange={(e) => onChange(e.target.value)}
        data-testid={`select-${label}`}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
    </div>
  ),
}));

describe('App Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the initial state correctly', () => {
    render(<App />);
    expect(screen.getByText(/CodePapi/i)).toBeDefined();
  });

  it('switches to Review mode and updates UI context', () => {
    render(<App />);

    const reviewTab = screen.getByText('Review');
    fireEvent.click(reviewTab);

    expect(screen.getByText('Analysis Mode')).toBeDefined();
  });

  it('switches to Fix mode and displays DiffEditor', () => {
    render(<App />);

    const fixTab = screen.getByText('Check Bugs');
    fireEvent.click(fixTab);

    expect(screen.getByText('Refactor Mode (Diff)')).toBeDefined();
    expect(screen.getByTestId('diff-editor')).toBeDefined();
  });
});
