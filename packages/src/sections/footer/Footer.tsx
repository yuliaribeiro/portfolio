export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-brand-primary/20 bg-brand-primary/05 border-t px-6 py-12">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-foreground-muted/70 text-lg">{`© ${year} Juliana Ribeiro. Built with Vite, React, TypeScript & Tailwind CSS.`}</p>
      </div>
    </footer>
  )
}
