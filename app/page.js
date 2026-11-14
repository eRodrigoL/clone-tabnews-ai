import { Suspense } from "react";
import Celebration from "./celebration";

export const revalidate = 60;

async function ContentCount() {
  let total = null;

  try {
    const response = await fetch(
      "https://www.tabnews.com.br/api/v1/contents?per_page=1&strategy=new",
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) },
    );
    const value = response.headers.get("x-pagination-total-rows");
    if (response.ok && value !== null && /^\d+$/.test(value)) {
      const count = Number(value);
      if (Number.isSafeInteger(count)) total = count;
    }
  } catch {
    // A indisponibilidade da API não deve impedir o acesso à página.
  }

  return (
    <p className="content-count" role="status">
      {total === null ? (
        "Não foi possível consultar o total de publicações agora."
      ) : (
        <><strong>{total.toLocaleString("pt-BR")}</strong> publicações no TabNews</>
      )}
    </p>
  );
}

export default function Home() {
  return (
    <main>
      <Celebration />
      <svg className="cone" viewBox="0 0 100 112" aria-hidden="true" focusable="false">
        <path fill="#f5be32" d="M43 6h14l27 91H16z" />
        <path fill="#f5f2e9" d="M37 26h26l6 20H31zm-12 40h50l6 20H19z" />
        <rect x="5" y="96" width="90" height="10" rx="3" fill="#f5be32" />
      </svg>
      <p className="label">Clone TabNews</p>
      <h1>Em <span>construção</span></h1>
      <p className="description">
        mas estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto.
      </p>
      <Suspense fallback={<p className="content-count" role="status">Consultando publicações do TabNews…</p>}>
        <ContentCount />
      </Suspense>
      <a className="official-link" href="https://www.tabnews.com.br/">
        Conheça o TabNews oficial <span aria-hidden="true">↗</span>
      </a>
      <div className="line" aria-hidden="true"></div>
    </main>
  );
}
