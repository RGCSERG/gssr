interface Props {
  name: string;
  onClick: () => void;
}

const Button = ({ name, onClick }: Props) => {
  return (
    <button
      className="text-shadow h-16 w-1/6 select-none rounded-full text-2xl shadow-lg 
    outline outline-4 outline-black hover:bg-gray-200 dark:text-white dark:outline-white 
    dark:hover:bg-gray-800"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
