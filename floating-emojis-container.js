import React, { Component } from 'react'

/**
 * Gestion de l'affichage des emojis sur les écrans
 */
class FloatingEmojisContainer extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      totalNumberOfRenderedEmojis: 0,
      emojisStack: []
    }
  }

  componentDidMount () {
    this.updateRenderOfEmojis(this.props.emojis)
    this.setKeyFrames()
  }

  componentWillReceiveProps (nextProps) {
    this.updateRenderOfEmojis(nextProps.emojis)
  }

  updateRenderOfEmojis = (emojis) => {
    const emojisToStack = Array.apply(null, Array(emojis.numberOfEmojis)).map((item, i) => {
      const img = emojis.img
      return {
        img: img,
        index: i + 1,
        key: `emoji-${this.state.totalNumberOfRenderedEmojis + i + 1}`,
        style: this.getStyleOfEmoji(i)
      }
    })
    this.setState(prevState => ({
      emojisStack: prevState.emojisStack.concat(emojisToStack),
      totalNumberOfRenderedEmojis: prevState.totalNumberOfRenderedEmojis + emojisToStack.length
    }))
  }

  removeEmoji = (key) => {
    this.setState(prevState => ({
      emojisStack: prevState.emojisStack.filter(emoji => emoji.key !== key)
    }))
  }

  getStyleOfEmoji = () => {
    const _size = Array.isArray(FloatingEmojisContainer.settingsEmojis.size)
      ? Math.floor(Math.random() * (FloatingEmojisContainer.settingsEmojis.size[1] - FloatingEmojisContainer.settingsEmojis.size[0] + 1)) + FloatingEmojisContainer.settingsEmojis.size[0]
      : FloatingEmojisContainer.settingsEmojis.size

    return {
      position: 'absolute',
      left: 0,
      fontSize: _size + 'em',
      transform: 'translateY(110vh)',
      animationName: 'float',
      animationDelay: Math.random() + 's',
      animationDuration: FloatingEmojisContainer.settingsEmojis.duration + 's' || this.props.animationDuration + 's',
      animationTimingFunction: FloatingEmojisContainer.settingsEmojis.animation || this.props.animationTimingFunction,
      animationRepeat: FloatingEmojisContainer.settingsEmojis.repeat || this.props.animationRepeat,
      animationDirection: FloatingEmojisContainer.settingsEmojis.direction || this.props.animationDirection,
      marginLeft: Math.random() * 100 + '%' || this.props.marginLeft + '%'
    }
  }

  setKeyFrames = () => {
    const MAX = 201
    const startHeight = this.props.startHeight || 100
    let styleSheet = document.styleSheets[0]
    const styles = `
  @keyframes float{
      ${Array.apply(null, { length: MAX + 1 })
            .map((v, x) => (
                {
                    percent: x * 100 / MAX,
                    width: Math.sin(x / 5) * 5,
                    height: startHeight + x * (-120 / MAX),
                    opacity: 1 - (x / 130)

                }))
            .map(
                ({ percent, width, height, opacity }) =>
                    `${percent}% {
          transform: translate(
            ${width}vw,
            ${height}vh         
          );
         opacity: ${opacity}
          
        }`
            )
            .join('')}
  }`
    styleSheet.insertRule(styles, styleSheet.cssRules.length)
}

  render () {
    return (
      this.state.emojisStack.map((emoji) =>
        <Floating style={emoji.style} key={emoji.key} img={emoji.img}
          callback={() => this.removeEmoji(emoji.key)} />
      )
    )
  }
}

class Floating extends Component {
  componentDidMount () {
    this.timeOut = setTimeout(() => {
      this.props.callback()
    }, 9000)
  }

  render () {
    return (
      <div style={this.props.style}><img src={this.props.img} /></div>
    )
  }
}

FloatingEmojisContainer.settingsEmojis = {
  repeat: 1,
  duration: 8,
  direction: 'normal',
  size: 2,
  animation: 'linear'
}

export default FloatingEmojisContainer

