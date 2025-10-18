
import Calendar from "./components/CalenderForm";

function App() {
  return (
    <>

      <div className="min-h-screen flex flex-row items-center justify-start p-4">
        <Calendar />
        <div className="w-[600px] h-[400px] max-w-md mx-auto bg-blue-500 border rounded-lg p-4 mt-10 bg-white-50 shadow-lg">
          <h1>Calendar App</h1>
        </div>
      </div>

    </>
  );
}

export default App;
