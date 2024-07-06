export default function Home() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center h-screen">
      <button className="bg-violet-500 flex items-center p-2 rounded-full text-white hover:bg-violet-400">
        <span className="material-symbols-outlined text-4xl">construction</span>
      </button>
      <button className="bg-violet-500 flex items-center p-2 rounded-full text-white hover:bg-violet-400">
        <span className="material-symbols-outlined text-4xl">piano</span>
      </button>
    </div>

  );
}