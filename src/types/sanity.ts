
export interface PortableTextBlock {
  _type: 'block';
  children: {
    _type: 'span';
    text: string;
  }[];
}

export interface SanityImage {
  asset: {
    url: string;
  };
  alt?: string;
}

export interface HeroSection {
  mainTitle: string;
  subTitle: string;
  catchphrase: string;
  limitedOfferText: string;
  callToActionText: string;
  recruitmentPeriod: string;
  limitedNumber: string;
  heroImage1: SanityImage;
  heroImage2: SanityImage;
}

export interface AboutSection {
  title: string;
  description: PortableTextBlock[];
  aboutImage: SanityImage;
}

export interface BenefitsSection {
  title: string;
  benefitItems: PortableTextBlock[];
  benefitImage1: SanityImage;
  benefitImage2: SanityImage;
}

export interface PricingSection {
  callToAction: string;
  trialPriceText: string;
  trialPrice: string;
  regularPriceText: string;
  regularPrice: string;
  limitedOfferNote: string;
  recruitmentText: string;
  promoCodeText: string;
  productDescription: string;
  detailedBenefits: string[];
  note: string;
  purchaseLink: string;
  pricingImage: SanityImage;
}

export interface Faq {
  question: string;
  answer: PortableTextBlock[];
}

export interface FaqSection {
  title: string;
  faqs: Faq[];
  faqImage: SanityImage;
}

export interface ContactSection {
  callToAction: string;
  instruction: string;
}

export interface PeechanzOwnerPageData {
  heroSection: HeroSection;
  aboutSection: AboutSection;
  benefitsSection: BenefitsSection;
  pricingSection: PricingSection;
  faqSection: FaqSection;
  contactSection: ContactSection;
}
