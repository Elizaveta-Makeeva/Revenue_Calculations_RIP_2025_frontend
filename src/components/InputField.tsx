import type { FC } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import './InputField.css';

interface Props {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  placeholder?: string;
  buttonTitle?: string;
}

const InputField: FC<Props> = ({
  value,
  setValue,
  onSubmit,
  loading = false,
  placeholder = 'Поиск',
  buttonTitle = 'Искать',
}) => (
  <div className="search-container">
    <Form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputGroup>
        <Form.Control
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className="search-button" type="submit" disabled={loading}>
          {buttonTitle}
        </Button>
      </InputGroup>
    </Form>
  </div>
);

export default InputField;
