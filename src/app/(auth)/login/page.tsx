"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    console.log(username);
    const password = formData.get("password");
    console.log(password);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    // console.log(object);
    const { accessToken } = await res.json();
    console.log(accessToken);
    if (accessToken) {
      // const nextUrl = searchParams.get('next')
      // @see: https://github.com/vercel/next.js/discussions/44149
      router.push("/");
    } else {
      // Make your shiny error handling with a great user experience
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen m-auto my-20">
      <div className="rounded-3xl shadow-2xl p-5 glassmorphism">
        <h1 className="text-heading1-bold mb-5 text-center">Login</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 justify-center items-center "
        >
          <label>
            Username:
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="text-black outline-none border border-gray-400 ml-2 rounded-lg px-2"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="text-black outline-none border border-gray-400 ml-2 rounded-lg px-2"
            />
          </label>
          <button
            type="submit"
            className="border bg-gray-900 px-3 py-1 rounded-full text-white hover:bg-gray-700 hover:text-white ease-in duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
