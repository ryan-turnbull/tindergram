import { Input } from '@nextui-org/react';

function HomePage() {
  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const value = e.target.value;
    console.log(value);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">
          Welcome to <span className="text-primary-500">Tindergram 🔥</span>
        </h1>
        <p>The refinement tool for you creative vision</p>
        <div className="space-x-2 flex items-center">
          <Input
            placeholder="Enter your search term..."
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
