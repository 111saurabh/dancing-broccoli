import { Spinner } from '@chakra-ui/react';

export default function Loader() {
  return (
    <div className="flex justify-center p-8">
      <Spinner size="xl" />
    </div>
  );
}