// app/widget/layout.tsx
export const metadata = {
    title: "Chat Widget",
    description: "Embeddable chat widget interface",
  };
  
  export default function WidgetLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <head>
          {/* Optional: you can add some global styles for the iframe */}
          <style>{`
            body {
              margin: 0;
              background: #f9fafb;
              font-family: system-ui, sans-serif;
            }
          `}</style>
        </head>
        <body>{children}</body>
      </html>
    );
  }
  