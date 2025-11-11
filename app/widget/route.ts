
// app/widget/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const jsCode = `
    (function() {
      // --- Prevent duplicates ---
      if (window.__CBW_WIDGET_LOADED__) return;
      window.__CBW_WIDGET_LOADED__ = true;

      // --- Create iframe ---
      const iframe = document.createElement('iframe');
      iframe.src = "https://cbw-rag-frontend.vercel.app/chat"; // 👈 your chat page
      iframe.style.position = "fixed";
      iframe.style.bottom = "90px";
      iframe.style.right = "30px";
      iframe.style.width = "400px";
      iframe.style.height = "520px";
      iframe.style.border = "none";
      iframe.style.borderRadius = "16px";
      iframe.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
      iframe.style.display = "none";
      iframe.style.zIndex = "2147483647";
      iframe.style.background = "transparent";

      // --- Floating Button ---
      const button = document.createElement('button');
      button.innerHTML = \`
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"
          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-message-circle">
          <path d="M3 20a5 5 0 0 1 1-2 9 9 0 1 1 3 3 5 5 0 0 1-2 1l-2 1Z"/>
        </svg>\`;
      button.style.position = "fixed";
      button.style.bottom = "20px";
      button.style.right = "30px";
      button.style.width = "64px";
      button.style.height = "64px";
      button.style.borderRadius = "50%";
      button.style.border = "none";
      button.style.background = "#2563eb";
      button.style.color = "white";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.justifyContent = "center";
      button.style.cursor = "pointer";
      button.style.zIndex = "2147483647";
      button.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
      button.style.transition = "transform 0.2s ease";
      button.onmouseenter = () => button.style.transform = "scale(1.1)";
      button.onmouseleave = () => button.style.transform = "scale(1)";

      // --- Toggle chat ---
      button.addEventListener('click', () => {
        const visible = iframe.style.display === "block";
        iframe.style.display = visible ? "none" : "block";
      });

      // --- Append ---
      document.body.appendChild(button);
      document.body.appendChild(iframe);
    })();
  `;

  return new NextResponse(jsCode, {
    headers: { "Content-Type": "application/javascript" },
  });
}
