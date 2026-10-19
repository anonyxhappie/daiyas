# Daiya’s — Brand & Trade Enquiry Website

Responsive brand website for Daiya Agro Industries Private Limited, focused on retailer, wholesaler and distributor enquiries.

## Stack
- Vite
- Tailwind CSS
- GSAP for optional, reduced-motion-aware scroll effects

## Local development
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Design goals
- Premium contemporary Indian-heritage visual direction.
- Product overview and clear trade-enquiry path.
- WhatsApp-first enquiry form; user reviews and sends the message themselves.
- Mobile-first layout, keyboard focus states, skip link and reduced-motion support.
- No cinematic loader blocking access to essential content.

## Before production launch
- Replace generic sequence-frame visuals in product cards with approved photographs of each actual pack.
- Confirm available SKUs and label/net quantity details.
- Verify product claims, nutrition declarations, FSSAI details and certification marks against current documentation.
- Verify company address, phone, email and WhatsApp destination.
- Test the WhatsApp enquiry flow on iOS and Android.
- Test mobile navigation, keyboard accessibility, reduced-motion behavior, image loading and production build.
- Review privacy wording against actual site behavior.

## Assets
- Brand logo: `public/assets/logos/Daiyas Logo.png`
- Existing cinematic sequence: `public/assets/frames/`

The frame sequence is retained, but page content no longer depends on loading it. Product cards currently use temporary campaign imagery and must be updated with approved SKU photography before launch.
