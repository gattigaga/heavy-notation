import Script from "next/script";

const GoogleTagScript = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-PQWHZSM4XY"
        async={true}
      />
      <Script id="google-tag">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-PQWHZSM4XY');
        `}
      </Script>
    </>
  );
};

export default GoogleTagScript;
