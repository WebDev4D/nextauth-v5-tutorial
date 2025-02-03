import { auth } from "@/app/(auth)/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    image: true,
  },
});

export default async function Home() {
  const session = await auth();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Logged in users</h1>
      <div className="w-full max-w-2xl">
        {users.map((user) => (
          <div
            key={user.id}
            className="mb-4 p-4 border rounded flex items-center gap-4"
          >
            <Image src={user.image as string} alt="" width={100} height={100} />
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
        ))}
      </div>
      {session ? (
        <>
          <p>You are logged in as {session.user?.name}</p>
          <Link href="/api/auth/signout">Sign out</Link>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <Link href="/api/auth/signin">Sign in</Link>
        </>
      )}
    </div>
  );
}
