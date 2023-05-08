interface Props {
  name: string;
}

const Button = ({ name }: Props) => {
  return (
    <button
      className="text-shadow h-16 w-1/6 select-none rounded-full text-2xl shadow-lg 
    outline outline-4 outline-black hover:bg-gray-200 dark:text-white dark:outline-white 
    dark:hover:bg-gray-800"
    >
      {name}
    </button>
  );
};

export default Button;
