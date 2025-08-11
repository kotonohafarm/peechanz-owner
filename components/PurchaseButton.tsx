// components/PurchaseButton.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface PurchaseButtonProps {
  link: string; // ボタンのリンク先
}

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({ link }) => {
  const [isRecruitmentPeriod, setIsRecruitmentPeriod] = useState(false);

  useEffect(() => {
    const checkRecruitmentPeriod = () => {
      const today = new Date();
      const day = today.getDate(); // 現在の日
      // const month = today.getMonth() + 1; // 現在の月 (0-indexedなので+1)

      // 毎月20日から25日を募集期間とする
      if (day >= 20 && day <= 25) {
        setIsRecruitmentPeriod(true);
      } else {
        setIsRecruitmentPeriod(false);
      }
    };

    // コンポーネントマウント時にチェック
    checkRecruitmentPeriod();

    // 日付が変わるたびにチェックするために、毎日0時に再チェックする（簡易的な実装）
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        checkRecruitmentPeriod();
      }
    }, 60 * 1000); // 1分ごとにチェック

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  if (!isRecruitmentPeriod) {
    return (
      <p className="text-center text-xl font-bold text-white mt-8">
        オーナー募集は毎月20日から25日限定
      </p>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-2xl transition duration-300 ease-in-out transform hover:scale-105 mt-8"
    >
      今すぐオーナーになる
    </a>
  );
};
