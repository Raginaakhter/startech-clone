import "./globals.css";
import AppShell from "@/components/AppShell";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "Star Tech - Leading Computer, Laptop & Gadget Shop in Bangladesh",
  description:
    "Star Tech is the Best Laptop, Computer, Gaming PC, Component, Accessories, and Gadget retail & Online shop in Bangladesh.",
  keywords:
    "Laptop shop in Bangladesh, computer shop in Bangladesh, PC shop, Gaming PC shop, Gadget shop, Star Tech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
