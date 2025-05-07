import Image from "next/image"
import Link from "next/link"

export default function NavbarHome() {
  return (
    <nav className="bg-[#5D6748] p-1 flex flex-col items-center justify-left">
      <div className="flex justify-start px-10 py-5">
        <Link href="/">
            <Image src="/assets/coffeecompass.svg" alt="Compass Logo" width={125} height={125} className="mr-2" />
        </Link>
      </div>

      <div className ="text-center">
      <h1 className="md:text-6xl font-bold">
              Caffeine Compass
            </h1>
      </div>
      <div className="flex items-center space-x-4 text-white px-10">
        <Link href="/map" className="<hover:underline">
          Map
        </Link>
        <Link href="/restaurant" className="hover:underline">
          Cafes
        </Link>
        <Link href="/tags" className="hover:underline">
          Tags
        </Link>
        <Link href="/profile" className="hover:underline">
          Profile
        </Link>
          <Link href="/login">
            <button type = "button" className="bg-white text-black px-3 py-1 rounded text-sm hover:underline">Login</button>
          </Link>
          <Link href="/signup">
          <button type ="button" className="bg-[#3a3a3a] text-white px-3 py-1 rounded text-sm hover:underline">Sign Up</button>
          </Link>
          </div>
    </nav>
  )
}