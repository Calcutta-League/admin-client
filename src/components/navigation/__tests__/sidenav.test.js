import { customRender, screen, cleanup, waitFor } from '../../../utilities/test-utils';
import userEvent from '@testing-library/user-event';
import Sidenav from '../sidenav';

test('renders with correct menu items', () => {
  customRender(<Sidenav />, {});

  expect(screen.getByText('Games')).toBeInTheDocument();
  expect(screen.getByText('Sports')).toBeInTheDocument();
  expect(screen.getByText('Tournaments')).toBeInTheDocument();
  expect(screen.getByText('Leagues')).toBeInTheDocument();
  expect(screen.getByText('Users')).toBeInTheDocument();
});