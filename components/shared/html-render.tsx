"use client";

interface HtmlRenderProps {
  html: string | null | undefined;
  className?: string;
}

const HtmlRender: React.FC<HtmlRenderProps> = ({ html, className }) => {
  if (!html) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HtmlRender;