type LoadArgs = {
  setHeaders: (headers: Record<string, string>) => void,
  cookies: {
    get: (name: string) => string | undefined,
    set: (name: string, value: string, options?: { path?: string; maxAge?: number }) => void
  }
};

export function load({ setHeaders, cookies }: LoadArgs) {
  setHeaders({
    // 'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    // 'Content-Type': 'application/json',
    'Content-Type': 'text/plain',
  });

  const visited = cookies.get('visited');

  cookies.set('visited', 'true', { path: '/', maxAge: 60 * 60 * 24 * 365 }); // 1 year

  return { visited: visited === 'true' };
}
