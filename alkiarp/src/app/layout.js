import "../index.css";

export const metadata = {
  title: "Alkia Roleplay - FiveM",
  description: "Serveur FiveM RP immersif, événements, communauté et staff actif.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body className="font-montserrat bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
