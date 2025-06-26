import React, { useEffect, useRef, forwardRef } from 'react';
import { ESCAPE_KEY } from '../appConstants/appConstants';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  changeEditing: (editing: boolean) => void;
};

export const EditForm = forwardRef<HTMLInputElement, Props>(
  ({ value, onValueChange, onSubmit, changeEditing }, ref) => {
    const didSubmitRef = useRef(false);

    useEffect(() => {
      const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === ESCAPE_KEY) {
          changeEditing(false);
        }
      };

      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('keyup', handleKeyUp);
      };
    }, [changeEditing]);

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();

      didSubmitRef.current = true;

      onSubmit();
    };

    const handleBlur = () => {
      if (!didSubmitRef.current) {
        onSubmit();
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          data-cy="TodoTitleField"
          type="text"
          ref={ref}
          autoFocus
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={value}
          onChange={e => onValueChange(e.target.value)}
          onBlur={handleBlur}
        />
      </form>
    );
  },
);

EditForm.displayName = 'EditForm';
