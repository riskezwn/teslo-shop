import { signIn } from 'next-auth/react';
import React from 'react';
import styles from './GoogleLoginButton.module.css';

const GoogleLoginButton = () => (
  <button type="button" className={styles.googlebtn} onClick={() => signIn('google')}>
    Sign in with Google
  </button>
);

export default GoogleLoginButton;
