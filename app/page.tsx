import { auth } from "@/app/(auth)/auth";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const session = await auth();
  return (
    <div className="container">
      <Image
        src={session?.user?.image ?? "/img.png"}
        alt="logo"
        width={100}
        height={100}
      />
      <p>Welcome {session?.user?.name ?? "Guest"}!</p>
      {session ? (
        <Link href="api/auth/signout">Sign Out</Link>
      ) : (
        <Link href="api/auth/signin">Sign In</Link>
      )}
    </div>
  );
}
