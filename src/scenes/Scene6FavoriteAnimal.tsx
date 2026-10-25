import React, { useState } from 'react';
import { ElephantSvg, RabbitSvg, DuckSvg, BirdSvg } from '../assets/illustrations';
import { soundEngine } from '../utils/soundEngine';
import type { AnimalId } from '../types';

interface Scene6FavoriteAnimalProps {
  onRestart: () => void;
  onBack: () => void;
  onOpenTeacherGuide: () => void;
}

export const Scene6FavoriteAnimal: React.FC<Scene6FavoriteAnimalProps> = ({
  onRestart,
  onBack,
  onOpenTeacherGuide,
}) => {
  const [favoriteId, setFavoriteId] = useState<AnimalId | null>('gajah');

  const animals: {
    id: AnimalId;
    name: string;
    badge: string;
    memoryPrompt: string;
    illustration: React.ReactNode;
  }[] = [
    {
      id: 'gajah',
      name: 'Gajah',
      badge: '🐘 Gajah yang Kuat',
      memoryPrompt: 'Belalainya yang panjang dan telinganya yang lebar!',
      illustration: <ElephantSvg size="100%" />,
    },
    {
      id: 'kelinci',
      name: 'Kelinci',
      badge: '🐰 Kelinci yang Lincah',
      memoryPrompt: 'Lompatannya yang riang dan telinga panjangnya!',
      illustration: <RabbitSvg size="100%" />,
    },
    {
      id: 'bebek',
      name: 'Bebek',
      badge: '🦆 Bebek yang Ceria',
      memoryPrompt: 'Suara kwek-kwek dan gaya berenangnya yang lucu!',
      illustration: <DuckSvg size="100%" />,
    },
    {
      id: 'burung',
      name: 'Burung',
      badge: '🐦 Burung yang Indah',
      memoryPrompt: 'Sayapnya yang cantik saat terbang di langit!',
      illustration: <BirdSvg size="100%" />,
    },
  ];

  const currentFavorite = animals.find(a => a.id === favoriteId) || animals[0];

  const handleSelectFavorite = (id: AnimalId) => {
    setFavoriteId(id);
    soundEngine.playSound('/audio/success-chime.wav', { fallbackType: 'chime' });
  };

  const handleRestart = () => {
    soundEngine.synthesizeSound('pop');
    onRestart();
  };

  return (
    <div className="scene-view scene-sunset-celebration-stage">
      {/* Scene Header */}
      <div className="scene-stage-header">
        <span className="scene-step-tag">Adegan 6 dari 6</span>
        <h2 className="scene-story-heading">Pemberhentian Akhir: Hewan Favorit & Refleksi</h2>
      </div>

      {/* Warm Invitation Ribbon */}
      <div className="sunset-invitation-ribbon">
        <span className="sunset-heart-icon" aria-hidden="true">💖</span>
        <p className="sunset-lead-text">
          Petualangan kita hari ini sangat menyenangkan! Sentuh <strong>hewan yang paling kamu sukai</strong> di bawah ini:
        </p>
      </div>

      {/* 4 Illustrated Animal Companion Cards */}
      <div
        className="favorite-gallery-grid"
        role="radiogroup"
        aria-label="Pilih hewan yang paling kamu sukai"
      >
        {animals.map((item) => {
          const isSelected = favoriteId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelectFavorite(item.id)}
              className={`fav-companion-card ${isSelected ? 'is-selected' : ''}`}
            >
              <div className="fav-art-pedestal">
                {item.illustration}
              </div>
              <div className="fav-info-footer">
                <span className="fav-title-text">{item.badge}</span>
                {isSelected && (
                  <span className="fav-selected-stamp" aria-hidden="true">
                    ❤️ Favoritku!
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Teacher-led Discussion & Oral Language Bubble */}
      <div className="story-reflection-card">
        <div className="reflection-title-bar">
          <span className="reflection-speech-icon" aria-hidden="true">🗣️</span>
          <div>
            <h3 className="reflection-card-title">Ayo Ceritakan pada Guru dan Temanmu!</h3>
            <span className="reflection-card-sub">Latihan bercerita dan berbahasa lisan dengan gembira</span>
          </div>
        </div>

        <div className="reflection-speech-bubble">
          <p className="bubble-quote">
            "Apa yang paling kamu sukai dari sahabat <strong>{currentFavorite.name}</strong>?"
          </p>
          <p className="bubble-hint">
            Kamu bisa bercerita: <em>"{currentFavorite.memoryPrompt}"</em>
          </p>
        </div>
      </div>

      {/* Safari Star Official Parchment Certificate */}
      <div className="safari-certificate-parchment" role="status">
        <div className="cert-top-badge" aria-hidden="true">
          🏆 PIAGAM BINTANG SAFARI HEWAN 🏆
        </div>
        <h3 className="cert-headline">Selamat! Kamu Sahabat Satwa Hebat!</h3>
        <p className="cert-description">
          Kamu sudah menjelajah dengan berani: mengenali ciri gajah, mendengarkan suara bebek, melompat lincah seperti kelinci, dan memasangkan nama hewan dengan tepat.
        </p>
        <div className="cert-animal-row" aria-hidden="true">
          <span className="cert-animal-item">🐘 Gajah</span>
          <span className="cert-animal-item">🐰 Kelinci</span>
          <span className="cert-animal-item">🦆 Bebek</span>
          <span className="cert-animal-item">🐦 Burung</span>
        </div>
        <div className="cert-stars-banner" aria-hidden="true">
          ⭐ 🌟 🌟 🌟 ⭐
        </div>
      </div>

      {/* Real-World Non-Digital Activity Scroll */}
      <div className="real-world-activity-scroll">
        <div className="activity-scroll-icon" aria-hidden="true">🎨</div>
        <div className="activity-scroll-content">
          <strong>Aktivitas Nyata di Kelas / Rumah:</strong>
          <p>
            Yuk bersama Ibu/Bapak Guru membuat gambar hewan kesukaanmu di kertas, melipat topeng hewan, atau bermain tebak gaya bersama teman!
          </p>
          <button
            type="button"
            onClick={onOpenTeacherGuide}
            className="btn-open-guide-link"
          >
            Lihat Ide Kegiatan Nyata di Panduan Guru ➔
          </button>
        </div>
      </div>

      {/* Storybook Navigation */}
      <div className="scene-storybook-nav">
        <button
          type="button"
          onClick={onBack}
          className="btn-story-nav btn-story-back"
          aria-label="Kembali ke Adegan 5"
        >
          ← Kembali
        </button>

        <button
          type="button"
          onClick={handleRestart}
          className="btn-restart-safari-hero"
          aria-label="Mulai ulang petualangan safari dari awal"
        >
          <span className="restart-spin-icon" aria-hidden="true">🔄</span>
          <span>Mulai Petualangan Safari Baru</span>
        </button>
      </div>
    </div>
  );
};
