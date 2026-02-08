import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FileUploader from './FileUploader';

describe('FileUploader Component', () => {
  const mockOnFileRead = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default state', () => {
    render(<FileUploader onFileRead={mockOnFileRead} />);
    expect(screen.getByText(/Upload \/ Drop/i)).toBeDefined();
    expect(screen.getByRole('img')).toBeDefined();
  });

  it('disables the button when the disabled prop is true', () => {
    render(<FileUploader onFileRead={mockOnFileRead} disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toHaveProperty('disabled', true);
    expect(screen.getByText(/Upload \(disabled\)/i)).toBeDefined();
  });

  it('handles file drop successfully', async () => {
    render(<FileUploader onFileRead={mockOnFileRead} />);
    const button = screen.getByRole('button');
    const file = new File(['print("hello")'], 'hello.py', {
      type: 'text/x-python',
    });

    // Simulate drop event
    fireEvent.drop(button, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(mockOnFileRead).toHaveBeenCalledWith('print("hello")', 'hello.py');
    });
  });

  it('does not read file if dropped while disabled', () => {
    render(<FileUploader onFileRead={mockOnFileRead} disabled={true} />);
    const button = screen.getByRole('button');
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });

    fireEvent.drop(button, {
      dataTransfer: { files: [file] },
    });

    expect(mockOnFileRead).not.toHaveBeenCalled();
  });
});
