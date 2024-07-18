interface CustomButtonProps {
  skill: string;
}

export default function CustomButton({icon}: CustomButtonProps ){
  return (
    <div className="group flex flex-col items-center">
      <button className="bg-violet-500 flex items-center justify-center w-16 h-16 rounded-full text-white group-hover:bg-violet-400 transition ease-in-out group-hover:-translate-y-1 group-hover:scale-110  m-2">
        <span className="material-symbols-outlined text-4xl">{skill.icon}</span>
      </button>
      <p className="text-center text-gray-700 group-hover:text-gray-500">{skill.name}</p>
    </div>
  );
};
