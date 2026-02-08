import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  const defaultProps = {
    mode: 'translate' as const,
    setMode: vi.fn(),
    isProcessing: false,
    targetLang: 'python',
    handleAction: vi.fn(),
    resetAll: vi.fn(),
    mobileNavOpen: false,
    setMobileNavOpen: vi.fn(),
  };

  it('calls setMode when a desktop mode button is clicked', () => {
    render(<Navbar {...defaultProps} />);
    const reviewButton = screen.getByText('Review');
    fireEvent.click(reviewButton);
    expect(defaultProps.setMode).toHaveBeenCalledWith('review');
  });

  it('disables "Run AI" when isProcessing is true', () => {
    render(<Navbar {...defaultProps} isProcessing={true} />);
    const runButton = screen.getByText('Thinking...');
    expect(runButton.closest('button')).toHaveProperty('disabled', true);
  });

  it('disables "Run AI" when mode is translate but no targetLang is selected', () => {
    render(<Navbar {...defaultProps} mode="translate" targetLang="" />);
    const runButton = screen.getByText('Run AI');
    expect(runButton.closest('button')).toHaveProperty('disabled', true);
  });

  it('calls handleAction when Run AI is clicked', () => {
    render(<Navbar {...defaultProps} />);
    const runButton = screen.getByText('Run AI');
    fireEvent.click(runButton);
    expect(defaultProps.handleAction).toHaveBeenCalled();
  });

  it('calls resetAll when reset button is clicked', () => {
    render(<Navbar {...defaultProps} />);
    const resetButton = screen.getByTitle('Reset All');
    fireEvent.click(resetButton);
    expect(defaultProps.resetAll).toHaveBeenCalled();
  });

  describe('Mobile Responsiveness', () => {
    it('shows the mobile dropdown only when mobileNavOpen is true', () => {
      const { rerender } = render(
        <Navbar {...defaultProps} mobileNavOpen={false} />,
      );
      // We use queryAllByText because "Translate" exists in the hidden desktop nav too
      // The mobile-specific reset button is a good indicator
      expect(screen.queryByText('Reset')).toBeNull();

      rerender(<Navbar {...defaultProps} mobileNavOpen={true} />);
      expect(screen.getByText('Reset')).toBeDefined();
    });

    it('closes mobile menu after selecting a mode', () => {
      render(<Navbar {...defaultProps} mobileNavOpen={true} />);
      const mobileReviewButton = screen.getAllByText('Review')[1]; // Second instance is mobile
      fireEvent.click(mobileReviewButton);

      expect(defaultProps.setMode).toHaveBeenCalledWith('review');
      expect(defaultProps.setMobileNavOpen).toHaveBeenCalledWith(false);
    });
  });

  it('shows loading spinner/text during processing', () => {
    render(<Navbar {...defaultProps} isProcessing={true} />);
    expect(screen.getByText('Thinking...')).toBeDefined();
  });
});
