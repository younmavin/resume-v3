'use client'

import { useState } from 'react'
import PortfolioCard from './PortfolioCard'
import PortfolioList from './PortfolioList'
import { portfolioData } from '@/data/portfolioData'

const tabs = ['웹 전체', '포트폴리오 웹', '웹 매거진', '기타 웹']

const Portfolio = ({ showList = true }: { showList?: boolean }) => {
  const [activeTab, setActiveTab] = useState('웹 전체')

  const filtered = activeTab === '웹 전체' ? portfolioData : portfolioData.filter((item) => item.type === activeTab)

  const counts = tabs.reduce(
    (acc, tab) => {
      acc[tab] = tab === '웹 전체' ? portfolioData.length : portfolioData.filter((item) => item.type === tab).length
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <>
      <PortfolioCard tabs={tabs} counts={counts} activeTab={activeTab} onTabChange={setActiveTab} interactive={showList} />
      {showList && <PortfolioList data={filtered} />}
    </>
  )
}

export default Portfolio
