import React from 'react';
import Head from 'next/head';
import CryptoJS from 'crypto-js';
import getConfig from 'next/config';

import { ShopContext } from 'src/context/ShopContext';
import { UserContext } from 'src/context/UserContext';

const { publicRuntimeConfig } = getConfig();

const INTERCOM_SECRET = publicRuntimeConfig?.INTERCOM_SECRET;

const HeadTag = () => {
  const { shop } = React.useContext(ShopContext);
  const { user } = React.useContext(UserContext);

  if (!shop) {
    return null;
  }

  const hash = CryptoJS.HmacSHA256(`${shop?.id}`, `${INTERCOM_SECRET}`);
  const hashInHex = CryptoJS.enc.Hex.stringify(hash);

  return (
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `var beamer_config = {
                product_id : 'mzMWWMVM30060',
                top: -5,
                right: -5,
              };`,
        }}
      />
      <script type="text/javascript" src="https://app.getbeamer.com/js/beamer-embed.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/jd6v8okb';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.intercomSettings = {
              app_id: "jd6v8okb",
              name: "${shop.profile?.legalBusinessName || ''}",
              email: "${user?.email}",
              plan: "Free", 
              created_at: "${user?.createdAt}",
              monthly_spend: "",
              user_hash: "${hashInHex}",
            }
          `,
        }}
      />
      <script src="https://cdn.zipy.ai/sdk/v1.0/zipy.min.umd.js" crossOrigin="anonymous" />
      <script> window.zipy &amp;&amp; window.zipy.init(&apos;cafc6d62&apos;);</script>
    </Head>
  );
};

export default HeadTag;
