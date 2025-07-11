import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">GetLogs [docs]</h1>
      <p className="text-fd-muted-foreground">
        You can open{' '}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{' '}
        and see the documentation.
      </p>
      <p className="text-fd-muted-foreground">
        You can try{' '}
        <Link
          href="/playground"
          className="text-fd-foreground font-semibold underline"
        >
          /playground
        </Link>{' '}
        and see how it works.
      </p>
    </main>
  );
}
