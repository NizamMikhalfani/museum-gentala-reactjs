'use client';
import { useState } from 'react';

export default function Password({
  name,
  onInput,
}: {
  name: string;
  onInput: (name: string, value: string) => void;
}) {
  const [show, setShow] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShow((s) => !s);
  };

  return (
    <div className="pwd-control">
      <label htmlFor={name}>Password</label>
      <input
        id={name}
        name={name}
        type={show ? 'text' : 'password'}
        autoComplete="current-password"
        spellCheck={false}
        required
        onInput={(e) => onInput(name, (e.target as HTMLInputElement).value)}
        className="pwd-input"
      />
      <button
        type="button"
        aria-controls={name}
        aria-pressed={show}
        aria-label={show ? 'Hide password' : 'Show password'}
        onMouseDown={handleMouseDown}
        className="pwd-toggle"
      >
        {show ? 'visibility_off' : 'visibility'}
      </button>
      <span className={`material-symbols-outlined pwd-icon`} aria-hidden="true">
        lock
      </span>
      <div className="pwd-border" aria-hidden="true" />
    </div>
  );
}
