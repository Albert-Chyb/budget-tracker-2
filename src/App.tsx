import { Button } from '@shadcn/components/ui/button';
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount((oldCount) => oldCount + 1)}>
        Test {count}
      </Button>
    </div>
  );
}

export default App;
