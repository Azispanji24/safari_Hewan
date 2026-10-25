import fs from 'fs';
import path from 'path';

// Helper to write a 16-bit mono WAV file
function createWavBuffer(sampleRate, samples) {
  const byteRate = sampleRate * 2;
  const blockAlign = 2;
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF chunk descriptor
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(1, 22);  // NumChannels (1 = Mono)
  buffer.writeUInt32LE(sampleRate, 24); // SampleRate
  buffer.writeUInt32LE(byteRate, 28);   // ByteRate
  buffer.writeUInt16LE(blockAlign, 32); // BlockAlign
  buffer.writeUInt16LE(16, 34); // BitsPerSample

  // data sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i++) {
    // Clamp sample between -1 and 1
    const s = Math.max(-1, Math.min(1, samples[i]));
    const val = s < 0 ? s * 0x8000 : s * 0x7FFF;
    buffer.writeInt16LE(Math.floor(val), 44 + i * 2);
  }

  return buffer;
}

const sampleRate = 44100;

// 1. Duck Quack: two short quacks with nasal formant resonance (300Hz base modulated with 750Hz resonance)
function generateDuckQuack() {
  const duration = 1.0;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  function writeQuack(startSec, lenSec, pitch) {
    const startIdx = Math.floor(startSec * sampleRate);
    const count = Math.floor(lenSec * sampleRate);
    for (let i = 0; i < count; i++) {
      const t = i / sampleRate;
      const progress = i / count;
      // Envelope: quick attack, sustained nasal body, exponential decay
      const env = progress < 0.1 ? progress / 0.1 : Math.exp(-progress * 4.5);
      // Pitch bend down slightly during quack
      const curPitch = pitch * (1 - 0.25 * progress);
      // Base saw-like waveform rich in harmonics
      let wave = 0;
      for (let h = 1; h <= 7; h++) {
        const harmonicAmp = 1 / (h * 0.8);
        wave += Math.sin(2 * Math.PI * curPitch * h * t) * harmonicAmp;
      }
      // Formant filtering (nasal resonance around 800Hz)
      const formant = Math.sin(2 * Math.PI * 850 * t) * 0.4;
      samples[startIdx + i] += (wave * 0.25 + formant * 0.2) * env;
    }
  }

  writeQuack(0.05, 0.35, 290);
  writeQuack(0.48, 0.42, 260);

  return createWavBuffer(sampleRate, samples);
}

// 2. Success Chime: Warm, joyful 3-note ascending arpeggio (C5 - E5 - G5 - C6)
function generateSuccessChime() {
  const duration = 1.4;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  const notes = [
    { start: 0.0, freq: 523.25, len: 0.6 }, // C5
    { start: 0.15, freq: 659.25, len: 0.6 }, // E5
    { start: 0.3, freq: 783.99, len: 0.7 }, // G5
    { start: 0.45, freq: 1046.50, len: 0.9 }, // C6
  ];

  notes.forEach(({ start, freq, len }) => {
    const startIdx = Math.floor(start * sampleRate);
    const count = Math.floor(len * sampleRate);
    for (let i = 0; i < count; i++) {
      const t = i / sampleRate;
      const progress = i / count;
      const env = Math.exp(-progress * 4.0) * (progress < 0.02 ? progress / 0.02 : 1);
      // Gentle sine + soft overtone
      const s = (Math.sin(2 * Math.PI * freq * t) + 0.3 * Math.sin(2 * Math.PI * freq * 2 * t)) * env * 0.35;
      samples[startIdx + i] += s;
    }
  });

  return createWavBuffer(sampleRate, samples);
}

// 3. Gentle Pop: Soft bubbly feedback for child taps
function generateGentlePop() {
  const duration = 0.2;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const progress = i / totalSamples;
    const env = Math.exp(-progress * 18);
    // Rapid pitch sweep downwards 800Hz -> 300Hz
    const pitch = 850 - 550 * Math.pow(progress, 0.5);
    const s = Math.sin(2 * Math.PI * pitch * t) * env * 0.4;
    samples[i] = s;
  }

  return createWavBuffer(sampleRate, samples);
}

// 4. Elephant Trumpet: Brassy, warm animal call
function generateElephantCall() {
  const duration = 1.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const progress = i / totalSamples;
    // Envelope with slow swell
    const env = progress < 0.2 ? Math.sin((progress / 0.2) * (Math.PI / 2)) : Math.exp(-(progress - 0.2) * 2.8);
    // Pitch rises then wavers: 350 -> 480 -> 420
    const pitch = 360 + 120 * Math.sin(progress * Math.PI) + 15 * Math.sin(t * 30);
    // Brassy harmonics
    let wave = 0;
    for (let h = 1; h <= 6; h++) {
      wave += Math.sin(2 * Math.PI * pitch * h * t) / h;
    }
    samples[i] = wave * env * 0.22;
  }

  return createWavBuffer(sampleRate, samples);
}

const outDir = path.resolve('./public/audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'bebek-quack.wav'), generateDuckQuack());
fs.writeFileSync(path.join(outDir, 'gajah-trumpet.wav'), generateElephantCall());
fs.writeFileSync(path.join(outDir, 'success-chime.wav'), generateSuccessChime());
fs.writeFileSync(path.join(outDir, 'gentle-pop.wav'), generateGentlePop());

console.log('Audio assets generated successfully in public/audio/');
