interface CustomButtonProps {
  icon: string;
}

export default function CustomButton({icon}: CustomButtonProps ){
  return (
    <button className="bg-violet-500 flex items-center p-2 rounded text-white h-33">
      <span className={
        `material-symbols-outlined`}
      >
        {icon}
      </span>
    </button>
  );
};
