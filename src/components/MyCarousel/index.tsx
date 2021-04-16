import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import Carousel from 'react-multi-carousel'

import 'react-multi-carousel/lib/styles.css'
import { ButtonLeft, ButtonRight } from './styles'

const CustomRight: React.FC<any> = ({ onClick }) => {
  return (
    <ButtonRight className="arrow right" onClick={onClick}>
      <HiChevronRight size={32} color="#fff" />
    </ButtonRight>
  )
}
const CustomLeft: React.FC<any> = ({ onClick }) => {
  return (
    <ButtonLeft className="arrow left" onClick={onClick}>
      <HiChevronLeft size={32} color="#fff" />
    </ButtonLeft>
  )
}

const MyCarousel: React.FC = ({ children }) => {
  return (
    <Carousel
      swipeable
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
          slidesToSlide: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide: 1,
        },
      }}
      deviceType="desktop"
      ssr={true}
      infinite={false}
      customRightArrow={<CustomRight />}
      customLeftArrow={<CustomLeft />}
    >
      {children}
    </Carousel>
  )
}

export default MyCarousel
