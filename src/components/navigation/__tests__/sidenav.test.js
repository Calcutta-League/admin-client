import { customRender, screen, cleanup, waitFor } from '../../../utilities/test-utils';
import userEvent from '@testing-library/user-event';
import Sidenav from '../sidenav';
import { navigate } from '@reach/router';

jest.mock('@reach/router');

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('renders with correct menu items', () => {
  customRender(<Sidenav />, {});

  expect(screen.getByText('Games')).toBeInTheDocument();
  expect(screen.getByText('Sports')).toBeInTheDocument();
  expect(screen.getByText('Tournaments')).toBeInTheDocument();
  expect(screen.getByText('Leagues')).toBeInTheDocument();
  expect(screen.getByText('Users')).toBeInTheDocument();
});

test('navigate called when menu item clicked', () => {
  customRender(<Sidenav />, {});

  userEvent.click(screen.getByText('Games'));
  expect(navigate).toBeCalled();
});