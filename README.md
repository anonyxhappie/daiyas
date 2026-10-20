# Daiya’s — Brand & Trade Enquiry Website

Responsive brand website for Daiya Agro Industries Private Limited, focused on retailer, wholesaler and distributor enquiries.

## Current redesign

The redesign/b2b-premium-heritage branch follows the approved long-page composition: compact green navigation, photo-led mustard/product hero, five pack cards, ghani process, business partnership band, quality/transparency strip, company/contact area and footer.

## Stack

- Vite
- Tailwind CSS
- GSAP for optional, reduced-motion-aware reveal effects

## Local development

Commands: npm install, npm run dev, npm run build, npm run preview.

## Enquiries

The primary business flow is WhatsApp and email, not e-commerce. WhatsApp opens a prefilled draft; the visitor must review it and press Send. The site does not persist form submissions.

## Design asset status — required before production

- `public/assets/products/pack-200ml.webp`, `pack-1l.webp`, `pack-2l.webp`, `pack-5l.webp` and `pack-15l.webp` are individual, high-resolution concept renders created from the supplied product reference artwork. The product cards load each image separately rather than cropping a sprite.
- `public/assets/campaign/hero-product-composition.webp` and `public/assets/about/facility-concept.webp` remain concept assets for the visual preview, not approved product photography or a verified photograph of the company premises.
- The process section uses the vector ghani illustration for crisp rendering across screen sizes.

**Before production:** replace concept pack renders with company-approved photography/renders of the exact commercial SKUs, confirm current pack sizes and labels, and replace the facility concept with an actual company-approved premises photo. Do not treat AI-generated label text or claims as verified product declarations.

The redesign does not use the old watermarked cinematic frame sequence as page imagery.

## Pre-launch checklist

- Confirm current pack sizes, labels and SKU availability.
- Verify every product claim, nutrition declaration, FSSAI detail and certification mark from current documentation.
- Test WhatsApp links and enquiry behavior on mobile and desktop.
- Test keyboard accessibility, reduced-motion behavior, image loading and production build.
- Review the privacy notice against actual analytics and data handling.
