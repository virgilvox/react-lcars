import React, {Component} from 'react'
import css from 'next/css'

class BottomElbow extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className={main}>
        <div className={topBar}>
          <div className={elbow}></div>
          <div className={square}></div>
          <div className={segment1}></div>
          <div className={segment2}></div>
          <div className={segment3}></div>
          <div className={end}></div>
        </div>
        <div className={topBar}>
          <div className={secondary}>
            <div className={firstButton}></div>
            <div className={secondButton}></div>
            <div className={thirdButton}></div>
            <div className={fourthButton}></div>
          </div>
          <div className={corner}>
          </div>
        </div>
      </div>
    )
  }
}

export default BottomElbow

const firstButton = css({
  'background-color': '#cc6666',
  'width': '100px',
  'height': '80px'
})

const secondButton = css({
  'background-color': '#cc6666',
  'width': '100px',
  'height': '180px',
  'margin-top': '10px'
})

const thirdButton = css({
  'background-color': '#FFA600',
  'width': '100px',
  'height': '30px',
  'margin-top': '10px'
})

const fourthButton = css({
  'background-color': '#cc6666',
  'width': '100px',
  'height': '100px',
  'margin-top': '10px'
})

const elbow = css({
  'background-color': '#cc6666',
  'width': '200px',
  'height': '30px',
  'border-top-left-radius': '2em'
})

const segment1 = css({
  'background-color': '#cc6666',
  'margin-left': '10px',
  'width': '100px',
  'height': '10px',
})

const segment2 = css({
  'background-color': '#fc6',
  'margin-left': '10px',
  'width': '300px',
  'height': '30px',
})

const segment3 = css({
  'background-color': '#f90',
  'margin-left': '10px',
  'width': '120px',
  'height': '30px',
})


const square = css({
  'background-color': '#f90',
  'margin-left': '10px',
  'width': '30px',
  'height': '30px',
})
const main = css({
  'display': 'flex',
  'margin-top': '10px',
  'flex-direction': 'column'
})

const secondary = css({
  'display': 'flex',
  'flex-direction': 'column'
})

const topBar = css({
  'display': 'flex',
  'flex-direction': 'row',
  'align-items': 'flex-start'
})

const corner = css({
  'background-color': 'black',
  'width': '30px',
  'height': '30px',
  'border-bottom-left-radius': '2em'
})

const end = css({
  'background-color': '#fc6',
  'width': '60px',
  'height': '30px',
  'margin-left': '10px',
  'border-bottom-right-radius': '2em',
  'border-top-right-radius': '2em'
})
