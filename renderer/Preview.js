const React = require('react')
const { getCurrentWindow } = require('electron').remote
const log = require('electron-log')
const h = React.createElement

class Preview extends React.Component {
  constructor () {
    super()

    this.ref = ref => {
      this.root = ref
      this.props.innerRef(ref)
    }

    this.onLoad = e => {
      const { zoom } = this.props
      try {
        this.root.setZoomFactor(zoom)
        setTimeout(() => this.capture(), 1000)
      } catch (err) {
        log.error(err)
      }
    }

    this.capture = () => {
      if (!this.root) return
      const rect = this.root.getBoundingClientRect()
      const win = getCurrentWindow()
      const opts = {
        x: Math.floor(rect.left),
        y: Math.floor(rect.top),
        width: rect.width,
        height: rect.height
      }
      win.capturePage(opts, (img) => {
        const datauri = img.toDataURL({})
        this.props.onCapture(datauri)
      })
    }
  }

  componentDidMount () {
    this.root.addEventListener('did-finish-load', this.onLoad)
  }

  componentWillUnmount () {
    this.root.removeEventListener('did-finish-load', this.onLoad)
  }

  // componentDidUpdate () {
  //   if (!this.root || !this.root.setZoomFactor) return
  //   const { zoom } = this.props
  //   try {
  //     this.root.setZoomFactor(zoom)
  //   } catch (err) {
  //     log.error(err)
  //   }
  // }

  render () {
    const {
      port,
      width,
      height,
      id,
      name
    } = this.props

    return (
      h('webview', {
        width,
        height,
        ref: this.ref,
        src: `http://localhost:${port}/${name}`,
        id,
        style: {
          width,
          height,
          backgroundColor: 'white',
        }
      })
    )
  }
}

Preview.defaultProps = {
  innerRef: () => {},
  width: 320,
  height: 160,
  zoom: 0.25,
  port: 3000,
  onCapture: () => {}
}

module.exports = Preview
