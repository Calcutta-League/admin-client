import { customRender, screen, cleanup, waitFor } from '../../../utilities/test-utils';
import userEvent from '@testing-library/user-event';
import Sidenav from '../sidenav';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom');

const navigate = useNavigate();

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