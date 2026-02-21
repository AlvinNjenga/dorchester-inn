import { Button } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Button>Click me</Button>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
