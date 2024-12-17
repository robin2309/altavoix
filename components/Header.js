import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="w-48">
            <Image
              src="https://i.postimg.cc/rKHzdhJN/logo.png"
              alt="Altavoix Logo"
              width={192}
              height={48}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

