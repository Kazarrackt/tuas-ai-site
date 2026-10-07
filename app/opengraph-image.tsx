import { ImageResponse } from 'next/og';

export const alt = 'Tuas AI Model API: frontier-level AI models hosted in Singapore. Launching soon.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#9200BA',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            background: '#FFCC00',
            color: '#580070',
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 2,
            padding: '10px 22px',
            borderRadius: 6,
          }}
        >
          MODEL API · HOSTED IN SINGAPORE
        </div>
        <div style={{ display: 'flex', fontSize: 104, fontWeight: 800, marginTop: 36 }}>
          Launching&nbsp;<span style={{ color: '#FFCC00' }}>soon.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 40, marginTop: 24, maxWidth: 900 }}>
          Frontier-level AI models through one OpenAI-compatible API, at vendor pricing.
        </div>
        <div style={{ display: 'flex', fontSize: 36, fontWeight: 800, marginTop: 'auto' }}>tuas.ai</div>
      </div>
    ),
    size,
  );
}
