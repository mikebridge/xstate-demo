// import React from "react"

import { useEffect, useState } from 'react';

export interface ContributionBoxProps {
  value: string,
  onSelected: (newValue:string) => void
  isSelected: boolean
}

export interface ContributionSelectorProps {
  values: Array<string>
  onChanged: (newValue:string) => void
}

// todo: figure out css styling on this

const contributionBoxStyle={
  padding:"12px",
  border:"1px",
  margin: "0",
  borderStyle: "solid"
}


export const ContributionBox: React.FC<ContributionBoxProps> = (
  {value, onSelected, isSelected}
) => {
  const [isMouseOver, setIsMouseOver]  = useState<boolean>(false)
  const [isSelected1, setIsSelected1]  = useState<boolean>(isSelected)
  const handleMouseLeave = () => {
    if (!isSelected1) {
      setIsMouseOver(false)
    }
  }
  const handleMouseEnter = () => {
    if (!isSelected1) {
      setIsMouseOver(true)
    }
  }
  const handleClick = () => {
    onSelected(value)
  }

  return <span
    key={value}
    onClick={handleClick}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    style={{...contributionBoxStyle, ...{backgroundColor: isSelected? "red": isMouseOver? "grey": "white"}}}>${value}</span>
}

export const ContributionSelectorComponent: React.FC<ContributionSelectorProps> = ({values, onChanged}) => {
  const [donation, setDonation] = useState<string|null>(null)
  const onBoxSelected = (value: string) => {
    console.log(`box selected: ${value}`)
    setDonation(value)
  }
  useEffect(() => {
    if (donation !== null) {
      onChanged(donation)
    }
  }, [donation])
  return (
    <div style={{display:"flex"}}>
      {values.map(value => (<ContributionBox key={value} value={value} isSelected={value===donation} onSelected={onBoxSelected}/>))}
    </div>
  )
}


