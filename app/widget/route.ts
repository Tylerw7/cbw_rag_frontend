
// app/widget/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const jsCode = `
    (function() {
      // --- Create iframe (chat box) ---
      const iframe = document.createElement('iframe');
      iframe.src = "https://cbw-rag-frontend.vercel.app/chat";  // 👈 Replace with your chat page URL
      iframe.style.position = "fixed";
      iframe.style.bottom = "80px";
      iframe.style.right = "20px";
      iframe.style.width = "400px";
      iframe.style.height = "500px";
      iframe.style.border = "1px solid #ccc";
      iframe.style.borderRadius = "12px";
      iframe.style.zIndex = "99999";
      iframe.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
      iframe.style.display = "none"; // 👈 Hidden by default
      iframe.style.background = "white";
      iframe.style.overflow = "hidden";

      // --- Create floating Lucide icon button ---
      const button = document.createElement('button');
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M3 20a5 5 0 0 1 1-2 9 9 0 1 1 3 3 5 5 0 0 1-2 1l-2 1Z"/></svg>';
      button.style.position = "fixed";
      button.style.bottom = "20px";
      button.style.right = "20px";
      button.style.width = "60px";
      button.style.height = "60px";
      button.style.borderRadius = "50%";
      button.style.border = "none";
      button.style.background = "#2563eb";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.justifyContent = "center";
      button.style.cursor = "pointer";
      button.style.zIndex = "100000";
      button.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";

      // --- Toggle chat visibility ---
      button.addEventListener('click', () => {
        iframe.style.display = iframe.style.display === "none" ? "block" : "none";
      });

      // --- Append elements to body ---
      document.body.appendChild(button);
      document.body.appendChild(iframe);
    })();
  `;

  return new NextResponse(jsCode, {
    headers: { "Content-Type": "application/javascript" },
  });
}
