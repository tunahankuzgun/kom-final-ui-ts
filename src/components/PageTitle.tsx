import "./PageTitle.sass";

interface PageTitleProps {
  title: string;
  children?: React.ReactNode;
}

export default function PageTitle({ title, children }: PageTitleProps) {
  return (
    <div className="PageTitle">
      <div>
        <h2>{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}
