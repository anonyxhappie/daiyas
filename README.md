# Daiya’s — Brand & Trade Enquiry Website

A responsive brand website for Daiya Agro Industries Private Limited, focused on retailer, wholesaler and distributor enquiries.

## Stack
- Vite
- Tailwind CSS
- GSAP for optional, reduced-motion-aware reveal effects

## Local development
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Website goals
- Present the Daiya’s Shubh Laxmi Bhog Kacchi Ghani Mustard Oil range.
- Generate trade enquiries through WhatsApp and email.
- Explain the brand and manufacturing process using verified information.
- Keep product information and contact paths usable without animation.

## Before production launch
- Replace the generic sequence-frame visuals in product cards with approved photographs of each actual pack.
- Confirm available SKUs and label/net quantity details.
- Verify claims, nutrition declarations, FSSAI details and certification marks against current documentation.
- Verify company address, phone number, email and WhatsApp number.
- Test the enquiry flow on iOS and Android. WhatsApp messages are not submitted until the user presses Send.
- Test mobile navigation, keyboard accessibility, reduced-motion behavior, image loading and production build.
- Review privacy and legal wording against actual site behavior.

## Assets
- Brand logo: `public/assets/logos/Daiyas Logo.png`
- Existing cinematic sequence: `public/assets/frames/`

The existing frame sequence is retained, but is no longer required to unlock page content. The product cards currently use a temporary sequence image and must be updated with approved SKU photography before public launch.
