export default function Home() {
  return (
    <main>
      <svg className="cone" viewBox="0 0 100 112" aria-hidden="true" focusable="false">
        <path fill="#f5be32" d="M43 6h14l27 91H16z" />
        <path fill="#f5f2e9" d="M37 26h26l6 20H31zm-12 40h50l6 20H19z" />
        <rect x="5" y="96" width="90" height="10" rx="3" fill="#f5be32" />
      </svg>
      <p className="label">Em construção</p>
      <h1>Nada aqui <span>por enquanto</span></h1>
      <div className="line" aria-hidden="true"></div>
    </main>
  );
}
