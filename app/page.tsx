import Posts from "./components/Posts";

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Welcome to my Personal Blog! <br />
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">John.</span>
        </span>
      </p>

      <Posts />
    </main>
  );
}
