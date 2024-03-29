import fallbackValue from '../index'

describe('Fallback value plugin', () => {
  it('should resolve fallback value arrays to strings', () => {
    const style = {
      width: ['-webkit-calc(20px)', 'calc(20px)'],
    }

    expect(fallbackValue()(style)).toEqual({
      width: '-webkit-calc(20px);width:calc(20px)',
    })
  })

  it('should convert properties to dash case within value', () => {
    const style = {
      marginLeft: ['-webkit-calc(20px)', 'calc(20px)'],
    }

    expect(fallbackValue()(style)).toEqual({
      marginLeft: '-webkit-calc(20px);margin-left:calc(20px)',
    })
  })

  it('should resolve nested style objects', () => {
    const style = {
      marginLeft: ['-webkit-calc(20px)', 'calc(20px)'],
      ':hover': {
        width: ['-webkit-calc(20px)', 'calc(20px)'],
      },
    }

    expect(fallbackValue()(style)).toEqual({
      marginLeft: '-webkit-calc(20px);margin-left:calc(20px)',
      ':hover': {
        width: '-webkit-calc(20px);width:calc(20px)',
      },
    })
  })

  it('should not touch fontFamily property', () => {
    const style = {
      fontFace: {
        fontFamily: 'Arial',
        src: ['foo.svg', 'bar.ttf'],
      },
      ':hover': {
        width: ['-webkit-calc(20px)', 'calc(20px)'],
      },
    }

    expect(fallbackValue()(style)).toEqual({
      fontFace: {
        fontFamily: 'Arial',
        src: ['foo.svg', 'bar.ttf'],
      },
      ':hover': {
        width: '-webkit-calc(20px);width:calc(20px)',
      },
    })
  })
})

describe('Fallback value plugin (optimized)', () => {
  it('should resolve fallback value arrays to strings', () => {
    const plugin = fallbackValue().optimized

    expect(
      plugin({
        property: 'width',
        value: ['-webkit-calc(20px)', 'calc(20px)'],
      })
    ).toEqual({
      property: 'width',
      value: '-webkit-calc(20px);width:calc(20px)',
    })
  })

  it('should convert properties to dash case within value', () => {
    const plugin = fallbackValue().optimized

    expect(
      plugin({
        property: 'marginLeft',
        value: ['-webkit-calc(20px)', 'calc(20px)'],
      })
    ).toEqual({
      property: 'marginLeft',
      value: '-webkit-calc(20px);margin-left:calc(20px)',
    })
  })
})
