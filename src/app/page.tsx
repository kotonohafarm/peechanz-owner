
'use client';

import Image from 'next/image';
import { client } from '../../sanity.config'; // パスを修正
import { groq } from 'next-sanity';
import { useState, useEffect } from 'react';
import { PeechanzOwnerPageData, PortableTextBlock, Faq } from '@/types/sanity';
// PurchaseButton はこのLPでは使用しないためコメントアウト
import { PurchaseButton } from '../../components/PurchaseButton';

// Sanityからデータをフェッチするクエリ
const query = groq`
  *[_type == "peechanzOwnerPage"][0]{
    heroSection {
      mainTitle,
      subTitle,
      catchphrase,
      limitedOfferText,
      callToActionText,
      recruitmentPeriod,
      limitedNumber,
      heroImage1 {
        asset->{url},
        alt,
      },
      heroImage2 {
        asset->{url},
        alt,
      },
    },
    aboutSection {
      title,
      description,
      aboutImage {
        asset->{url},
        alt,
      },
    },
    benefitsSection {
      title,
      benefitItems,
      benefitImage1 {
        asset->{url},
        alt,
      },
      benefitImage2 {
        asset->{url},
        alt,
      },
    },
    pricingSection {
      callToAction,
      trialPriceText,
      trialPrice,
      regularPriceText,
      regularPrice,
      limitedOfferNote,
      recruitmentText,
      promoCodeText,
      productDescription,
      detailedBenefits,
      note,
      purchaseLink,
      pricingImage {
        asset->{url},
        alt,
      },
    },
    faqSection {
      title,
      faqs[] {
        question,
        answer,
      },
      faqImage {
        asset->{url},
        alt,
      },
    },
    contactSection {
      callToAction,
      instruction,
    },
  }
`;

export default function PeechanzOwnerPage() { // Trigger redeploy
  const [data, setData] = useState<PeechanzOwnerPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await client.fetch(query);
        setData(fetchedData);
      } catch (err) {
        console.error("Failed to fetch data from Sanity:", err);
        setError("コンテンツの読み込みに失敗しました。");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-lg text-gray-700">コンテンツを読み込み中...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-lg text-red-600">{error}</div>;
  }

  if (!data) {
    return <div className="text-center py-20 text-lg text-gray-700">コンテンツがありません。Sanity Studioでコンテンツを入力してください。</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* ヒーローセクション */}
      <section className="relative text-center bg-yellow-50 p-8 rounded-lg shadow-md">
        <div className="absolute top-4 left-4 w-24 h-24">
          <Image
            src="/images/rogo/kotonohafarm-rogo.png"
            alt="ことのはファームロゴ"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="absolute top-4 right-4 w-24 h-24">
          <Image
            src="/images/rogo/kodawari-rogo.png"
            alt="こだわりロゴ"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-yellow-800 mb-4">{data.heroSection.mainTitle}</h1>
        <p className="text-2xl font-semibold text-yellow-700 mb-6">{data.heroSection.subTitle}</p>
        <p className="text-3xl font-extrabold text-orange-600 mb-8">{data.heroSection.catchphrase}</p>
        <p className="text-xl text-gray-700">
          {data.heroSection.limitedOfferText}
        </p>
        <p className="text-xl font-bold text-yellow-800 mt-4">{data.heroSection.callToActionText}</p>
        <p className="text-lg text-gray-600 mt-2">{data.heroSection.recruitmentPeriod}</p>
        <p className="text-lg font-bold text-red-600">{data.heroSection.limitedNumber}</p>
        {/* Sanity StudioでheroSectionにheroImage1とheroImage2を追加してください */}
        <div className="mt-8 w-full flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 md:space-x-4">
          {data.heroSection.heroImage1 && (
            <div className="w-full md:w-1/2 h-64 relative">
              <Image
                src={data.heroSection.heroImage1.asset.url}
                alt={data.heroSection.heroImage1.alt || 'ヒーロー画像1'}
                fill={true}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
          {data.heroSection.heroImage2 && (
            <div className="w-full md:w-1/2 h-64 relative">
              <Image
                src={data.heroSection.heroImage2.asset.url}
                alt={data.heroSection.heroImage2.alt || 'ヒーロー画像2'}
                fill={true}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
        <PurchaseButton link="#pricing-section" text="今すぐ共同オーナーになる" messageClassName="text-white" />
      </section>

      {/* アバウトセクション */}
      <section className="bg-amber-700 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-white mb-6">{data.aboutSection.title}</h2>
            {data.aboutSection.description.map((block: PortableTextBlock, index: number) => (
              <p key={index} className="text-lg text-white mb-4">
                {block.children[0].text}
              </p>
            ))}
            {/* ここに画像を追加 */}
            {data.aboutSection.aboutImage && (
              <div className="mt-8 w-full h-64 relative">
                <Image
                  src={data.aboutSection.aboutImage.asset.url}
                  alt={data.aboutSection.aboutImage.alt || 'アバウト画像'}
                  fill={true}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
            <div className="text-center">
              <PurchaseButton link="#pricing-section" text="今すぐ共同オーナーになる" messageClassName="text-white" />
            </div>
          </section>

      {/* 特典セクション */}
      <section className="bg-yellow-50 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-yellow-800 mb-6">{data.benefitsSection.title}</h2>
        {data.benefitsSection.benefitItems.map((block: PortableTextBlock, index: number) => (
          <p key={index} className="text-lg text-gray-700 mb-4">
            {block.children[0].text}
          </p>
        ))}
        {/* ここに画像を追加 */}
        <div className="relative w-full max-w-lg mx-auto mt-8 h-80">
          {data.benefitsSection.benefitImage1 && (
            <div className="absolute top-0 left-0 w-2/3 h-2/3">
              <Image
                src={data.benefitsSection.benefitImage1.asset.url}
                alt={data.benefitsSection.benefitImage1.alt || '特典画像1'}
                fill={true}
                style={{ objectFit: 'contain' }}
                className="z-10"
              />
            </div>
          )}
          {data.benefitsSection.benefitImage2 && (
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3">
              <Image
                src={data.benefitsSection.benefitImage2.asset.url}
                alt={data.benefitsSection.benefitImage2.alt || '特典画像2'}
                fill={true}
                style={{ objectFit: 'contain' }}
                className="z-20"
              />
            </div>
          )}
        </div>
        <div className="text-center">
          <PurchaseButton link="#pricing-section" text="今すぐ共同オーナーになる" messageClassName="text-white" />
        </div>
      </section>

      {/* 価格セクション */}
      <section id="pricing-section" className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-yellow-800 mb-6 text-center">{data.pricingSection.callToAction}</h2>
        <div className="text-center mb-8">
          <p className="text-2xl font-semibold text-gray-700">{data.pricingSection.trialPriceText}</p>
          <p className="text-4xl font-extrabold text-red-600 mb-4">{data.pricingSection.trialPrice}</p>
          <p className="text-lg text-gray-700">{data.pricingSection.limitedOfferNote}</p>
          <p className="text-lg font-bold text-red-700">{data.pricingSection.recruitmentText}</p>
          <p className="font-bold text-xl text-red-600 mt-2 bg-yellow-200 p-1 rounded">{data.pricingSection.promoCodeText}</p>
          <div className="text-center">
            <PurchaseButton
              link={data.pricingSection.purchaseLink}
              text="お試し価格で今すぐ申し込む"
              messageClassName="text-white"
            />
          </div>

        <div className="text-center mb-8">
          <p className="text-2xl font-semibold text-gray-700">{data.pricingSection.regularPriceText}</p>
          <p className="text-4xl font-extrabold text-green-600 mb-4">{data.pricingSection.regularPrice}</p>
        </div>

        <p className="text-xl font-bold text-yellow-800 mb-4">{data.pricingSection.productDescription}</p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-8">
          {data.pricingSection.detailedBenefits.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 mt-2 text-center">{data.pricingSection.note}</p>
        {/* ここに画像を追加 */}
        {data.pricingSection.pricingImage && (
          <div className="mt-8 w-full h-64 relative mx-auto">
            <Image
              src={data.pricingSection.pricingImage.asset.url}
              alt={data.pricingSection.pricingImage.alt || '価格セクション画像'}
              fill={true}
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
        <div className="text-center">
          </section>

      {/* よくある質問セクション */}
      <section className="bg-yellow-50 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-yellow-800 mb-6 text-center">{data.faqSection.title}</h2>
        <div className="space-y-4">
          {data.faqSection.faqs.map((faq: Faq, index: number) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-yellow-700">{faq.question}</h3>
              {faq.answer.map((block: PortableTextBlock, blockIndex: number) => (
                <p key={blockIndex} className="text-lg text-gray-700">{block.children[0].text}</p>
              ))}
            </div>
          ))}
        </div>
        {/* ここに画像を追加 */}
        {data.faqSection.faqImage && (
          <div className="mt-8 w-full h-64 relative mx-auto">
            <Image
              src={data.faqSection.faqImage.asset.url}
              alt={data.faqSection.faqImage.alt || 'よくある質問画像'}
              fill={true}
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
        <div className="text-center">
          <PurchaseButton link="#pricing-section" text="今すぐ共同オーナーになる" messageClassName="text-white" />
        </div>
      </section>

      {/* コンタクトセクション */}
      <section className="text-center max-w-4xl mx-auto py-8">
        <h2 className="text-4xl font-bold text-yellow-800 mb-6">{data.contactSection.callToAction}</h2>
        <p className="text-lg text-gray-700 mb-8">
          {data.contactSection.instruction}
        </p>
        <div className="mb-4">
          <PurchaseButton link="#pricing-section" text="今すぐ共同オーナーになる" messageClassName="text-white" />
        </div>
        {/* LINE公式アカウントへのリンクは別途追加 */}
        <a
          href="https://lin.ee/n652Uqp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          LINEでお問い合わせ
        </a>
      </section>
    </div>
  );
}
