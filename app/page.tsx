import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <a href="/lottie-csr">lottie-csr</a>
      <a href="/lottie-ssr">lottie-ssr</a>
      <a href="/gif-csr">gif-csr</a>
      <a href="/gif-ssr">gif-ssr</a>
      <a href="/svg-csr">svg-csr</a>
      <a href="/svg-ssr">svg-ssr</a>
    </div>
  );
}
