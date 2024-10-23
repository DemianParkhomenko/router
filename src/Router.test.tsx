import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Router', () => {
  it('navigate between pages', async () => {
    render(<App />);

    expect(screen.getByText(/Root/)).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');

    const dashboardLink = screen.getByRole('link', { name: /Dashboard/ });
    await userEvent.click(dashboardLink);

    expect(window.location.pathname).toBe('/dashboard');

    const orderLink = screen.getByRole('link', { name: /Order 1/ });
    await userEvent.click(orderLink);

    expect(window.location.pathname).toBe('/orders/1');

    const productLink = screen.getByRole('link', { name: /Product 1/ });
    await userEvent.click(productLink);

    expect(window.location.pathname).toBe('/orders/1/products/1');
  });
});
