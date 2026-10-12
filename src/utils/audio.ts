// High-fidelity low-latency camera shutter audio synthesis
export const playShutterSound = (): void => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.05);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
    }

    // Front curtain click
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1600;
    filter.Q.value = 2.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);

    // Rear curtain snap
    const rearNoise = ctx.createBufferSource();
    rearNoise.buffer = buffer;
    const rearGain = ctx.createGain();
    rearGain.gain.setValueAtTime(0.25, now + 0.038);
    rearGain.gain.exponentialRampToValueAtTime(0.001, now + 0.082);
    const rearFilter = ctx.createBiquadFilter();
    rearFilter.type = 'highpass';
    rearFilter.frequency.value = 2200;
    rearNoise.connect(rearFilter);
    rearFilter.connect(rearGain);
    rearGain.connect(ctx.destination);
    rearNoise.start(now + 0.036);
  } catch {
    // Non-blocking fallback
  }
};
