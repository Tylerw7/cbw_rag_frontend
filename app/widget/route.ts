//https://cbw-rag-frontend.vercel.app/chat
// app/widget/route.ts
export const runtime = "edge";

export async function GET() {
  const js = `
(function() {
  const CHAT_URL = location.origin + '/chat'; // iframe URL
  const IFRAME_ID = 'my-site-chat-iframe';

  if (window.__myChatWidgetInjected) return;
  window.__myChatWidgetInjected = true;

  // Inline MessageCircle SVG (Lucide style)
  const messageCircleSVG = '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.84-1.3L3 20l1.3-4.84A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>';

  // Create floating button
  const btn = document.createElement('div');
  btn.id = 'my-site-chat-button';
  btn.style.position = 'fixed';
  btn.style.right = '24px';
  btn.style.bottom = '24px';
  btn.style.width = '56px';
  btn.style.height = '56px';
  btn.style.borderRadius = '50%';
  btn.style.background = '#2563eb';
  btn.style.display = 'flex';
  btn.style.alignItems = 'center';
  btn.style.justifyContent = 'center';
  btn.style.cursor = 'pointer';
  btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
  btn.style.zIndex = '2147483647';
  btn.innerHTML = messageCircleSVG; // inject SVG
  document.body.appendChild(btn);

  // Create iframe (hidden by default)
  const iframe = document.createElement('iframe');
  iframe.id = IFRAME_ID;
  iframe.src = CHAT_URL;
  iframe.style.position = 'fixed';
  iframe.style.right = '24px';
  iframe.style.bottom = '100px';
  iframe.style.width = '340px';
  iframe.style.height = '520px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
  iframe.style.zIndex = '2147483647';
  iframe.style.display = 'none';
  iframe.allow = 'clipboard-write; microphone; camera';
  document.body.appendChild(iframe);

  // Toggle iframe on click
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const isVisible = iframe.style.display === 'block';
    iframe.style.display = isVisible ? 'none' : 'block';
  });

  // Close when clicking outside
  window.addEventListener('click', function(ev) {
    if (!iframe.contains(ev.target) && ev.target !== btn) {
      iframe.style.display = 'none';
    }
  });

  // Optional: listen for postMessage to close iframe
  window.addEventListener('message', (evt) => {
    if (evt.data === 'close-chat') iframe.style.display = 'none';
  });
})();
  `.trim();

  return new Response(js, {
    headers: {
      'content-type': 'application/javascript; charset=utf-8',
      'cache-control': 'public, max-age=60'
    },
  });
}
