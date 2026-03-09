import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.accent)_0%,transparent_42%),radial-gradient(circle_at_bottom,theme(colors.secondary)_0%,transparent_48%)] opacity-45" />
      <div className="absolute inset-x-6 top-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      <section className="relative w-full max-w-5xl rounded-4xl border border-border/70 bg-card/85 px-8 py-16 text-center shadow-2xl backdrop-blur-sm sm:px-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="mb-6 inline-flex rounded-full border border-primary/20 bg-secondary px-4 py-1 text-sm font-medium tracking-wide text-secondary-foreground">
            Laboratório visual e aplicado
          </span>
          <h1 className="font-serif text-5xl leading-tight font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="text-primary">Software</span>{" "}
            <span className="text-foreground">Architecture</span>{" "}
            <span className="text-accent">Lab</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Arquitetura de Software com conteúdo prático e visual
          </p>
        </div>
      </section>
    </main>
  );
}
