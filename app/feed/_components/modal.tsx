'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './modal.module.css';

// Wraps the intercepted route in a native <dialog>. showModal() gives focus
// handling, Esc support and an inert page behind it. Every way of closing goes
// back in history: the URL returns to /feed and the @modal slot renders its
// default.tsx (null) again.
export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      // Esc fires `cancel` (removal from the DOM does not), so navigating
      // here can't trigger a second router.back().
      onCancel={(event) => {
        event.preventDefault();
        router.back();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) router.back();
      }}
    >
      <div className={styles.content}>
        <button
          type="button"
          className={styles.close}
          onClick={() => router.back()}
        >
          Close
        </button>
        {children}
      </div>
    </dialog>
  );
}
