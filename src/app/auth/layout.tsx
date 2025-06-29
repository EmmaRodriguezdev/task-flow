export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-l from-blue-dark to-black">{children}</div>
  );
}
