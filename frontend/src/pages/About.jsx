export default function About() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <title>About</title>
      <h1 className="text-3xl font-semibold text-foreground">About</h1>
      <p className="mt-4 text-muted-foreground">
        This is a MERN stack project: an Express/MongoDB API paired with a React frontend, using
        JWT auth, Tailwind + shadcn/ui for styling, and Zustand + React Hook Form + Zod for state
        and form validation.
      </p>
      <p className="mt-4 text-muted-foreground">
        Built as a working reference for wiring these pieces together end to end.
      </p>
    </div>
  );
}
