type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex max-w-3xl flex-col ${alignClass}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="headline-section text-wrap-balance">{title}</h2>
      <p className="body-large mt-6 text-wrap-balance">{description}</p>
    </div>
  );
}
