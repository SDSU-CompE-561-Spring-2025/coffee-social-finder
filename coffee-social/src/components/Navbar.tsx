import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-[#5D6748] p-1 flex items-center justify-between">
      <div className="flex justify-start">
        <Link href="/">
            <Image src="/assets/coffeecompass.png" alt="Compass Logo" width={200} height={100} className="mr-2" />
        </Link>
      </div>
      <div className="flex items-center space-x-4 text-white">
        <Link href="/map" className="hover:underline">
          Map
        </Link>
        <Link href="/restaurant" className="hover:underline">
          Cafes
        </Link>
        <Link href="/bookmarks" className="hover:underline">
          Bookmarks
        </Link>
        <Link href="/profile" className="hover:underline">
          Profile
        </Link>
          <Link href="/sign-in">
            <button type = "button" className="bg-white text-black px-3 py-1 rounded text-sm">Sign in</button>
          </Link>
          <Link href="/Register">
          <button type ="button" className="bg-[#3a3a3a] text-white px-3 py-1 rounded text-sm">Register</button>
          </Link>
          </div>
    </nav>
  )
}