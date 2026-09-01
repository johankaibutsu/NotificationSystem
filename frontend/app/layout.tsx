import './globals.css';
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" strategy="afterInteractive" />
        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(async function(OneSignal) {
              await OneSignal.init({
                appId: "${process.env.ONESIGNAL_APP_ID}",
                safari_web_id: "${process.env.SAFARI_ID}",
                allowLocalhostAsSecureOrigin: true,
              });
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
