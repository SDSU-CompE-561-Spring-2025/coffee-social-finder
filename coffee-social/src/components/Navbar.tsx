import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-[#5D6748] p-2 flex items-center justify-between">
      <div className="flex items-center">
        <Image src="/assets/coffeecompass.png" alt="Compass Logo" width={60} height={60} className="mr-2" />
      </div>
      <div className="flex items-center space-x-4 text-white">
        <Link href="/map" className="hover:underline">
          Map
        </Link>
        <Link href="/cafes" className="hover:underline">
          Cafes
        </Link>
        <Link href="/bookmarks" className="hover:underline">
          Bookmarks
        </Link>
        <Link href="/account" className="hover:underline">
          Profile
        </Link>
        <button className="bg-white text-black px-3 py-1 rounded text-sm">Sign in</button>
        <button className="bg-[#3a3a3a] text-white px-3 py-1 rounded text-sm">Register</button>
      </div>
    </nav>
  )
}
