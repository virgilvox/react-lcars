import React, { Component } from 'react'
import Button from '../components/button'
import TopElbow from '../components/top-elbow'
import BottomElbow from '../components/bottom-elbow'
import css from 'next/css'

export default () => (
  <div className={style}>
    <TopElbow />
    <BottomElbow />
  </div>
)

const style =css({
  'background-color': 'black',
  'height': '800px'
})
