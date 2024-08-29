export const App = () => {
  return (
        <div className="relative">
          {/* <div className="absolute aspect-square top-[-50%] left-[-25%] opacity-50 w-[150%] bg-gradient-radial rounded-full from-cyan-950 to-transparent via-transparent"/> */}
          <div className="absolute -z-30 bg-black w-full h-full"/>
          <div className="absolute -z-20 bg-cyan-950 bg-opacity-40 w-full h-full"/>
          <div className="absolute -z-10 bg-gradient-to-br opacity-40 from-cyan-950 w-screen h-screen" />
          <div className="absolute -z-10 h-full w-full bg-grid opacity-5 bg-center"/>
          <main className="w-full h-full">
            <div className="grid grid-cols-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) => (
                <div key={i} className="bg-cyan-950 bg-opacity-50 p-4 m-4 rounded-lg aspect-square flex flex-col flex-center gap-4">
                  <h1 className="text-white">Hello World {i}</h1>

                  <p className="text-white">
                    Content
                  </p>

                  <button className="bg-white text-black p-2 rounded-md">Click me</button>
                </div>
                  )
              )}

            </div>
          </main>
        </div>
  );
}