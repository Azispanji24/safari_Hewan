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
    <div className="scene-view scene-6-view">
      <div className="scene-card">
        {/* Scene Indicator */}
        <div className="scene-badge-header">
          <span className="scene-step-pill">Adegan 6 dari 6</span>
          <h2 className="scene-heading">Hewan Favoritku & Refleksi</h2>
        </div>

        {/* Reflection Prompt */}
        <div className="reflection-intro-box">
          <p className="instruction-lead">
            💖 <strong>Pertanyaan Refleksi:</strong> Hewan mana yang paling kamu sukai di Safari hari ini?
          </p>
        </div>

        {/* Animal Selector Grid */}
        <div className="favorite-picker-grid" role="radiogroup" aria-label="Pilih hewan favoritmu">
          {animals.map((item) => {
            const isSelected = favoriteId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectFavorite(item.id)}
                className={`favorite-choice-card ${isSelected ? 'is-selected' : ''}`}
              >
                <div className="fav-illustration-box">
                  {item.illustration}
                </div>
                <div className="fav-card-footer">
                  <span className="fav-badge-text">{item.badge}</span>
                  {isSelected && <span className="fav-heart" aria-hidden="true">❤️ Favoritku</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Teacher-led Discussion Prompt */}
        <div className="teacher-reflection-card">
          <div className="reflection-header-row">
            <span className="reflection-icon" aria-hidden="true">🗣️</span>
            <div>
              <h3 className="reflection-title">Ayo Ceritakan pada Guru atau Temanmu!</h3>
              <p className="reflection-subtitle">Kesempatan mengungkapkan ide dan bahasa lisan</p>
            </div>
          </div>

          <div className="reflection-prompt-bubble">
            <p className="prompt-quote">
              "Apa yang paling kamu ingat tentang <strong>{currentFavorite.name}</strong>?"
            </p>
            <p className="prompt-hint">
              Contoh cerita: <em>"{currentFavorite.memoryPrompt}"</em>
            </p>
          </div>
        </div>

        {/* Completion Celebration Badge */}
        <div className="safari-certificate-card" role="status">
          <div className="cert-ribbon" aria-hidden="true">🏆 BINTANG SAFARI HEWAN 🏆</div>
          <h3 className="cert-title">Selamat! Kamu Sahabat Hewan Hebat!</h3>
          <p className="cert-message">
            Kamu telah berhasil mengamati hewan, mendengarkan suaranya, melompat dan bergerak, serta memasangkan namanya dengan riang.
          </p>
          <div className="cert-stars" aria-hidden="true">
            ⭐ 🌟 🐘 🐰 🦆 🐦 🌟 ⭐
          </div>
        </div>

        {/* Follow-up reminder */}
        <div className="followup-reminder-box">
          <p>
            🎨 <strong>Aktivitas Nyata Selanjutnya:</strong> Yuk bersama Ibu/Bapak Guru membuat kartu pasangan hewan atau menggambar hewan favoritmu di kertas!
          </p>
          <button
            type="button"
            onClick={onOpenTeacherGuide}
            className="btn-link-guide"
          >
            Lihat Panduan Aktivitas Nyata ➔
          </button>
        </div>

        {/* Scene Navigation */}
        <div className="scene-nav-actions">
          <button
            type="button"
            onClick={onBack}
            className="btn-nav btn-nav-back"
            aria-label="Kembali ke Adegan 5"
          >
            ← Kembali
          </button>

          <button
            type="button"
            onClick={handleRestart}
            className="btn-nav btn-restart-adventure"
            aria-label="Ulangi petualangan dari awal"
          >
            <span aria-hidden="true">🔄</span>
            <span>Ulangi Petualangan Safari</span>
          </button>
        </div>
      </div>
    </div>
  );
};
