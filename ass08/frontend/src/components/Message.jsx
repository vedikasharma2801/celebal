// frontend/src/components/Message.jsx
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info', // Default color will be blue if not specified
};

export default Message;