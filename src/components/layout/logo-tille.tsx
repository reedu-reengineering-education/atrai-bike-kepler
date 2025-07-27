const logo = {
  url: "/",
  src: "/logo.png",
  alt: "Atraibike Logo",
  title: "ATRAIBIKE PLATFORM",
};
export default function LogoTile() {
  return (
    <a href={logo.url}>
      <div className="flex items-center gap-4">
        <img
          src={logo.src}
          alt={logo.alt}
          title={logo.title}
          className="h-10 dark:invert"
        />
        <h2 className="text-xl font-bold">{logo.title}</h2>
      </div>
    </a>
  );
}
