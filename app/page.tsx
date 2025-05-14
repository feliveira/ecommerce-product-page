export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <div className="w-full flex flex-col md:w-2/5">
        <div className="w-full h-full aspect-square bg-red-500 border rounded-lg">

        </div>
        <div className="w-full mt-4 grid grid-cols-4 gap-2 sm:gap-4">
          <div className="w-full aspect-square bg-red-500 border rounded-lg">

          </div>
          <div className="w-full aspect-square bg-red-500 border rounded-lg">

          </div>
          <div className="w-full aspect-square bg-red-500 border rounded-lg">

          </div>
          <div className="w-full aspect-square bg-red-500 border rounded-lg">

          </div>
        </div>
      </div>
    </div>
  );
}
