import React, {Component} from 'react'
import css from 'next/css'

class ElbowBottomLeft extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className={mainElbow}>
        <div className={elbowContainer}>
          <div className={button}></div>
          <div className={corner}>
            <div className={concave} />
          </div>
        </div>
        <div className={elbow}></div>
      </div>
    )
  }
}
export default ElbowBottomLeft

const button = css({
  'background-color': '#99ccff',
  'width': '100px',
  'height': '80px',
  'margin-top': '10px'
})

const elbow = css({
  'background-color': '#99ccff',
  'width': '200px',
  'height': '30px',
  'border-bottom-left-radius': '2em'
})

const mainElbow = css({
  'display': 'flex',
  'flex-direction': 'column',
  'width': '200px'
})

const elbowContainer = css({
  'display': 'flex',
  'flex-direction': 'row',
  'align-items': 'flex-end'
})

const corner = css({
  'background-color': '#99ccff',
  'width': '30px',
  'height': '30px',
  'position': 'relative',
  'display': 'flex'
})
const concave = css({
  'background-color': 'black',
  'width': '30px',
  'height': '30px',
  'border-bottom-left-radius': '2em',
  'top': 0,
  'right': 0
})
