export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-linear-to-b from-blue-dark to-dark">{children}</div>
  );
}
