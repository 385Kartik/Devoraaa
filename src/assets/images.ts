// Centralized image registry. Import images from here across the app.
import nayan from "./nayan.png";
import kartik from "./kartik.png";

import sovPortal from "./remote/sov_portal_c665c87259_7be99a388d.webp";
import wiseTalk from "./remote/wise_talk_9af024187b_96cc461eda.webp";
import csWeb from "./remote/CS_a23bff7541_be56109500.webp";
import csMobile from "./remote/CS_Mob_2859d898d7_425e6496b4.webp";
import brandMonkey from "./remote/BM_Banner_968928d689.png";
import qrynto from "./remote/Qrynto_Banner_7ee07f5b89.png";
import car360 from "./remote/360_2ed4e74e2a_a2b6bf46bf.webp";
import mgPortal from "./remote/MG_d0da169860_969f23e0a8.webp";
import onlineFiling from "./remote/online_filing_d1135c8254_43b90bb663.jpg";
import idsspl from "./remote/IDSSPL_Card_Banner_4856563ee0.png";
import memoria from "./remote/Memoria_Card_Banner_087ecc87ab.png";
import cricketOrNothing from "./remote/CON_Banner_40e7c8bd75.jpg";
import shivorix from "./remote/Shivorix_RE_banner_b39bbaf736.png";

import blogTechStack from "./remote/blog_tech_stack.jpg";
import blogAiVoice from "./remote/blog_ai_voice.jpg";
import blogRnFlutter from "./remote/blog_rn_flutter.jpg";
import blogMultitenant from "./remote/blog_multitenant.jpg";
import blogMvp from "./remote/blog_mvp.jpg";
import blogBilling from "./remote/blog_billing.jpg";

export const images = {
  nayan,
  kartik,
  sovPortal,
  wiseTalk,
  csWeb,
  csMobile,
  brandMonkey,
  qrynto,
  car360,
  mgPortal,
  onlineFiling,
  idsspl,
  memoria,
  cricketOrNothing,
  shivorix,
  blogTechStack,
  blogAiVoice,
  blogRnFlutter,
  blogMultitenant,
  blogMvp,
  blogBilling,
} as const;

export type ImageKey = keyof typeof images;
export default images;
