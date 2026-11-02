import "./globals.css";

export const metadata = {
  title: "Nada aqui por enquanto",
  description: "Nada aqui por enquanto",
};

export const viewport = {
  themeColor: "#222320",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
