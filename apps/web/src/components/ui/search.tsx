import { Button } from "./button";
import { Input } from "./input";

const SearchComponent = () => {
  return (
    <span className="flex flex-row gap-2 w-full p-24">
      <Input placeholder="Search" />
      <Button>Search</Button>
    </span>
  );
};

export { SearchComponent };
