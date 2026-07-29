export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border px-4 py-6 text-center text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} MERN Project. All rights reserved.</p>
    </footer>
  );
}
