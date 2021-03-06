class BufferSource {
  public play: () => void
  public stop: () => void

  private audioCtx: AudioContext
  private buffer: AudioBuffer
  private destination: AudioNode
  private source: AudioBufferSourceNode

  constructor(audioCtx, buffer) {
    this.audioCtx = audioCtx
    this.buffer = buffer
    this.destination = null
    this.source = undefined

    this.play = this._play.bind(this)
    this.stop = this._stop.bind(this)
  }

  public connect(destination: AudioNode) {
    this.destination = destination
  }

  private _play() {
    console.log('Playing ...')

    if (this.source !== undefined) {
      this.stop()
    }

    this.source = this.audioCtx.createBufferSource()
    this.source.buffer = this.buffer
    this.source.connect(this.destination)
    this.source.start(0)
  }

  private _stop() {
    console.log('Stopping.')

    if (this.source === undefined) {
      return
    }

    this.source.stop()
    this.source.disconnect()
    this.source = undefined
  }
}

export default BufferSource
