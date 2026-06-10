// Hook de observabilidad de Next.js — captura el error REAL de cualquier render
// server-side (incluido el "Server Components render error" que en prod oculta
// el mensaje al cliente). TEMPORAL: para diagnosticar el crash de /propiedades.
export async function onRequestError(
  err: unknown,
  request: { path?: string; method?: string },
): Promise<void> {
  const e = err as {
    name?: string;
    message?: string;
    stack?: string;
    digest?: string;
  };
  // Logs cortos y tagueados para que sobrevivan al truncado del visor de logs.
  console.error(`E_PATH ${request?.method} ${request?.path} digest=${e?.digest}`);
  console.error(`E_NAME ${e?.name}`);
  console.error(`E_MSG ${(e?.message || "").slice(0, 70)}`);
  const stack = (e?.stack || "").split("\n").map((s) => s.trim());
  stack.slice(1, 6).forEach((line, i) => console.error(`E_STK${i} ${line.slice(0, 80)}`));
}
