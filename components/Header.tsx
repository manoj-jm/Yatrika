import { useLocation } from "react-router";
import { cn } from "~/lib/utils";

interface props {
  title: String;
  description: String;
}

const Header = ({ title, description }: props) => {
  let location = useLocation();
  return (
    <header className="header">
      <article>
        <h1 className={cn('text-dark-100',location.pathname === '/dashboard' ? 'text-2xl md:text-4xl font-bold' : 'text-xl md:text-2xl font-semibold')}>{title}</h1>
        <p className={cn('text-gray-100 font-normal',location.pathname === '/dashboard' ? 'text-base md:text-lg' : 'text-sm md:text-lg')}>{description}</p>
      </article>
    </header>
  );
};

export default Header;
