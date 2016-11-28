import React, {Component} from 'react'
import css from 'next/css'
import { style, fontFace } from 'glamor'

class TopLabel extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className={main}>
        <div className={leftCap}></div>
        <div className={segment}></div>
        <div className={textArea}>
          <h1 className={text} {...style({ fontFamily: family })}>
            01:06
          </h1>
        </div>
        <div className={rightCap}></div>
      </div>
    )
  }
}

export default TopLabel

const segment = css({
  'background-color': '#cc99cc',
  'margin-left': '10px',
  'width': '100px',
  'height': '40px'
})


const text = css({
  'color': '#f90',
  'display': 'flex',
  'font-size': '250%'
})

const textArea = css({
  'background-color': 'black',
  'width': '80px',
  'height': '40px',
  'align-items': 'center',
  'display': 'flex',
  'justify-content': 'center'
})

let family = fontFace({
  fontFamily: 'Okuda',
  fontStyle: 'normal',
  src: "url('https://s3-us-west-2.amazonaws.com/lcars-react/lcars.ttf')"
})

const main = css({
  'display': 'flex',
  'flex-direction': 'row',
  'align-items': 'flex-end'
})

const leftCap = css({
  'background-color': '#cc99cc',
  'width': '40px',
  'height': '40px',
  'margin-left': '10px',
  'border-bottom-left-radius': '2em',
  'border-top-left-radius': '2em'
})

const rightCap = css({
  'background-color': '#cc99cc',
  'width': '40px',
  'height': '40px',
  'border-bottom-right-radius': '2em',
  'border-top-right-radius': '2em'
})
