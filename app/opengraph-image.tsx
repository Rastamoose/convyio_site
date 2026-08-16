import { ImageResponse } from 'next/og';
import { COPY } from '@/lib/copy';
import { gruvboxLight } from '@/lib/theme';

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
          backgroundColor: gruvboxLight.bgHard,
          color: gruvboxLight.fg,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: gruvboxLight.accentDeep,
            marginBottom: 32,
          }}
        >
          {COPY.productName}
        </div>
        <div
          style={{
            fontSize: 40,
            lineHeight: 1.3,
            maxWidth: 900,
            color: gruvboxLight.fg,
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
            color: gruvboxLight.fgMuted,
          }}
        >
          Start using Convyio
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
