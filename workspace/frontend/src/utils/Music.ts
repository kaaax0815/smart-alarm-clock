import { getRingtones } from './api';

export default class Music {
  private audioContext = new AudioContext();
  private gainNode: GainNode;
  static instance: Music;
  private currentSource?: AudioBufferSourceNode;
  loop = false;
  private currentBuffer: AudioBuffer | null = null;

  /**
   * Current Volume in Percent
   */
  private currentVolume = 100;

  private constructor() {
    this.gainNode = this.audioContext.createGain();
  }

  /**
   * Play a audio file
   * @param src Source URL of a mp3 stream
   */
  async play(src: string) {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this._play(audioBuffer);
  }

  /**
   * Play a ringtone
   * @param ringtone Ringtone to play
   */
  async playRingtone(ringtone: string) {
    const ringtones = await getRingtones();
    const { location } = ringtones.find((r) => r.name === ringtone)!;
    const src = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}${location}`;
    this.loop = true;
    this.play(src);
  }

  private _play(audioBuffer: AudioBuffer) {
    console.log('Check', { loop: this.loop, buffer: this.currentBuffer });
    if (this.currentSource) {
      this.currentSource.stop();
    }
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    this.currentBuffer = audioBuffer;
    source.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = this.currentVolume / 100;
    source.onended = () => {
      this.onEnd();
    };
    source.start();
    this.currentSource = source;
  }

  stop() {
    this.loop = false;
    if (this.currentSource) {
      this.currentSource.stop();
    }
  }

  private onEnd() {
    console.log('Source ended', { loop: this.loop, buffer: this.currentBuffer });
    if (this.loop && this.currentBuffer) {
      this._play(this.currentBuffer);
    }
  }

  /**
   * @returns {number} Current Volume in Percent
   */
  get volume(): number {
    return this.currentVolume;
  }

  /**
   * Set Volume
   * @param {number} volume Volume in Percent
   */
  set volume(volume: number) {
    this.currentVolume = volume;
    this.gainNode.gain.value = volume / 100;
  }

  /**
   * @returns {Music} Singleton instance of Music
   */
  static getInstance(): Music {
    console.log('New Instance?', { instance: Music.instance });
    if (!Music.instance) {
      Music.instance = new Music();
    }
    return Music.instance;
  }
}
