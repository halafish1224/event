export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-intro">
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </header>
  );
}
