import Navbar from "./componenets/Navbar"
import Admin from "./pages/Admin"
import Sidebar from "./componenets/Sidebar"

export default function App() {
  return (
    <main className="bg-primary text-tertiary">
      <div className="mx-auto max-w-[1500px]">
        <Navbar />
        <Admin />
      </div>
    </main>
  )
}