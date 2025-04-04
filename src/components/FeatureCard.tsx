type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <article className="font-light max-w-[21.375rem] grid justify-items-center text-center px-[1.375rem] py-[1.125rem]">
      <img
        className="size-[4.5rem] rounded-full mb-[2.063rem]"
        src={icon}
        alt=""
        aria-hidden
      />
      <h2 className="mb-4 text-xl leading-[1.438em] text-card-title-foreground">
        {title}
      </h2>
      <p className="text-sm leading-[1.313em] text-card-description-foreground">
        {description}
      </p>
    </article>
  );
}
