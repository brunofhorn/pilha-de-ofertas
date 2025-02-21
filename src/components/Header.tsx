import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 z-30 w-full h-16 bg-white border-b px-4">
      <div className="flex items-center justify-end h-full">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;