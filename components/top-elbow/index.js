import React, {Component} from 'react'
import css from 'next/css'
import TopLabel from './top-label'
import ElbowBottomLeft from '../elbow-bottom-left'
import { style, fontFace } from 'glamor'

class TopElbow extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className={main}>
        <div className={firstButton}>
          <a className={text} {...style({ fontFamily: family })}>
            Button 1
          </a>
        </div>
        <div className={elbowAndNav}>
          <ElbowBottomLeft />
          <div className={navBar}>
            <div className={segment1}></div>
            <div className={segment2}></div>
            <div className={segment3}></div>
            <div className={end}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default TopElbow

const firstButton = css({
  'background-color': '#cc99cc',
  'width': '100px',
  'height': '40px',
  'margin-right': '400px'
})

const segment1 = css({
  'background-color': '#FFA600',
  'margin-left': '50px',
  'width': '100px',
  'height': '10px',
})

const segment2 = css({
  'background-color': '#cc6666',
  'margin-left': '10px',
  'width': '300px',
  'height': '30px',
})

const segment3 = css({
  'background-color': '#cc99cc',
  'margin-left': '10px',
  'width': '120px',
  'height': '30px',
})

const main = css({
  'display': 'flex',
  'flex-direction': 'column'
})

const navBar = css({
  'display': 'flex',
  'flex-direction': 'row',
  'align-items': 'flex-end'
})

const elbowAndNav = css({
  'display': 'flex',
  'flex-direction': 'row',
  'align-items': 'flex-end'
})

const end = css({
  'background-color': '#fc6',
  'width': '60px',
  'height': '30px',
  'margin-left': '10px',
  'border-bottom-right-radius': '2em',
  'border-top-right-radius': '2em'
})

const text = css({
  'color': 'black',
  'display': 'flex',
  'font-size': '160%'
})

let family = fontFace({
  fontFamily: 'Okuda',
  fontStyle: 'normal',
  src: "url('https://s3-us-west-2.amazonaws.com/lcars-react/lcars.ttf')"
})
