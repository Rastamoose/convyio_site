import { ImageResponse } from 'next/og';
import { gruvboxLight } from '@/lib/theme';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: gruvboxLight.bg,
          borderRadius: 6,
          border: `2px solid ${gruvboxLight.border}`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: gruvboxLight.accentDeep,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          p
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
