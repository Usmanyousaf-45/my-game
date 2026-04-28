import Link from "next/link";

export default function GameCard({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition"
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
    </Link>
  );
}