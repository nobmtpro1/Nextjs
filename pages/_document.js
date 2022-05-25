import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document
{
    render ()
    {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="author" content="author" />
                    <meta property="og:type" content="website" />
                    <meta property="og:site_name" content="aimacademy" />
                    <meta property="og:locale" content="vi_VI" />

                    <link rel="manifest" href="/manifest.json" />
                    <link rel="icon" href="/images/icon192.png" sizes="192x192" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
                    <script src="https://sp.zalo.me/plugins/sdk.js"></script>
                </Head>
                <body>
                    <div className="loader-container hide">
                        <span className="loader"></span>
                    </div>

                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
