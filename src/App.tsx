import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { WelcomeScreen } from './scenes/WelcomeScreen';
import { Scene1Welcome } from './scenes/Scene1Welcome';
import { Scene2Elephant } from './scenes/Scene2Elephant';
import { Scene3GuessSound } from './scenes/Scene3GuessSound';
import { Scene4MoveLikeAnimal } from './scenes/Scene4MoveLikeAnimal';
import { Scene5MatchAnimal } from './scenes/Scene5MatchAnimal';
import { Scene6FavoriteAnimal } from './scenes/Scene6FavoriteAnimal';
import { JungleCanopySvg } from './assets/illustrations';
import { audioController } from './utils/audioController';
import type { SceneId, AnimalId } from './types';
import './App.css';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneId>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      let s = (params.get('scene') || '').toLowerCase().trim();
      s = s.replace('-', ''); // normalize 'scene-1' -> 'scene1'
      if (['welcome', 'scene1', 'scene2', 'scene3', 'scene4', 'scene5', 'scene6'].includes(s)) {
        return s as SceneId;
      }
    } catch {
      // fallback
    }
    return 'welcome';
  });
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalId>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const a = (params.get('animal') || '').toLowerCase().trim();
      if (['gajah', 'kelinci', 'bebek', 'burung'].includes(a)) {
        return a as AnimalId;
      }
    } catch {
      // fallback
    }
    return 'gajah';
  });
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);

  const navigateToScene = (nextScene: SceneId) => {
    // Safely stop any playing narration or sound effect, while preserving BGM
    audioController.stopForeground();
    setCurrentScene(nextScene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    audioController.stopForeground();
    setCurrentScene('welcome');
    setSelectedAnimal('gajah');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Top Jungle Canopy Environmental Frame */}
      <div className="app-canopy-banner" aria-hidden="true">
        <JungleCanopySvg className="app-jungle-canopy" />
      </div>

      {/* Header bar */}
      <Header
        currentScene={currentScene}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onRestart={handleRestart}
      />

      {/* Progress navigation for the 6 learning scenes */}
      <ProgressBar
        currentScene={currentScene}
        selectedAnimal={selectedAnimal}
        onNavigate={navigateToScene}
      />

      {/* Main Learning Scene Viewport */}
      <main id="main-content" className="main-content-area" tabIndex={-1}>
        {currentScene === 'welcome' && (
          <WelcomeScreen
            onStart={() => navigateToScene('scene1')}
            onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
          />
        )}

        {currentScene === 'scene1' && (
          <Scene1Welcome
            selectedAnimal={selectedAnimal}
            onSelectAnimal={setSelectedAnimal}
            onNext={() => navigateToScene('scene2')}
            onBack={() => navigateToScene('welcome')}
          />
        )}

        {currentScene === 'scene2' && (
          <Scene2Elephant
            selectedAnimal={selectedAnimal}
            onSelectAnimal={setSelectedAnimal}
            onNext={() => navigateToScene('scene3')}
            onBack={() => navigateToScene('scene1')}
          />
        )}

        {currentScene === 'scene3' && (
          <Scene3GuessSound
            onNext={() => navigateToScene('scene4')}
            onBack={() => navigateToScene('scene2')}
          />
        )}

        {currentScene === 'scene4' && (
          <Scene4MoveLikeAnimal
            onNext={() => navigateToScene('scene5')}
            onBack={() => navigateToScene('scene3')}
          />
        )}

        {currentScene === 'scene5' && (
          <Scene5MatchAnimal
            onNext={() => navigateToScene('scene6')}
            onBack={() => navigateToScene('scene4')}
          />
        )}

        {currentScene === 'scene6' && (
          <Scene6FavoriteAnimal
            onRestart={handleRestart}
            onBack={() => navigateToScene('scene5')}
            onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
          />
        )}
      </main>

      {/* Accessible Teacher Guide Modal */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />

      {/* Accessible Footer */}
      <footer className="app-footer">
        <p className="footer-copyright">
          Safari Hewan: Lihat, Tebak, dan Bergerak • UTS IT untuk AUD PIAUD Semester 5
        </p>
        <p className="footer-subtext">
          Dirancang dengan prinsip pembelajaran anak usia dini ramah layar, bebas iklan, dan berpusat pada interaksi nyata.
        </p>
      </footer>
    </div>
  );
};

export default App;
