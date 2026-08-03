import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('navigates to the project detail page when read more is clicked', async () => {
  const user = userEvent.setup();
  window.history.pushState({}, '', '/');

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  await user.click(screen.getAllByRole('button', { name: /read more/i })[0]);

  expect(window.location.pathname).toBe('/projects/granttrackph');
});
