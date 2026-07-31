import { ImageResponse } from 'next/og';
import { COPY } from '@/lib/copy';

export const alt = COPY.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 80,
          backgroundColor: '#1d2021',
          color: '#fbf1c7',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#fabd2f',
            marginBottom: 32,
          }}
        >
          plurall
        </div>
        <div
          style={{
            fontSize: 40,
            lineHeight: 1.3,
            maxWidth: 900,
            color: '#fbf1c7',
          }}
        >
          Your team and its agents, in the same room.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 80,
            fontSize: 24,
            color: '#928374',
          }}
        >
          Get early access
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
