// app/widget/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const jsCode = `
    (function() {
      const iframe = document.createElement('iframe');
      iframe.src = "https://cbw-rag-frontend.vercel.app/";  
      iframe.style.position = "fixed";
      iframe.style.bottom = "80px";
      iframe.style.right = "20px";
      iframe.style.width = "400px";
      iframe.style.height = "500px";
      iframe.style.border = "1px solid #ccc";
      iframe.style.borderRadius = "12px";
      iframe.style.zIndex = "99999";
      iframe.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
      iframe.style.display = "none";
      iframe.style.background = "white";

      const button = document.createElement('button');
      button.innerText = "💬";
      button.style.position = "fixed";
      button.style.bottom = "20px";
      button.style.right = "20px";
      button.style.width = "60px";
      button.style.height = "60px";
      button.style.borderRadius = "50%";
      button.style.border = "none";
      button.style.background = "#2563eb";
      button.style.color = "white";
      button.style.fontSize = "24px";
      button.style.cursor = "pointer";
      button.style.zIndex = "100000";

      button.addEventListener('click', () => {
        iframe.style.display = iframe.style.display === "none" ? "block" : "none";
      });

      document.body.appendChild(button);
      document.body.appendChild(iframe);
    })();
  `;

  return new NextResponse(jsCode, {
    headers: { "Content-Type": "application/javascript" },
  });
}
