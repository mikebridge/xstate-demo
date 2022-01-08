// import styles from './app.module.css';

import { DonationForm } from './main/donationForm';
import { useState } from 'react';
import { DonationWithTShirtForm } from './main/donationWithTShirtForm';

export function App() {
  const [form, setForm] = useState<number>(1)
  return (
    <>
    { form === 0 &&
     <DonationForm />
    }
    { form === 1 &&
      <DonationWithTShirtForm />
    }
    </>
  );
}

export default App;
