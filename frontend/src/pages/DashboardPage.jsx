import React from 'react'
import Layout from '../components/Layout/Layout'
import ChartsSection from '../components/ChartsSection/ChartsSection'

const chartUrls = [
    "https://charts.mongodb.com/charts-project-0-ppcbj/embed/charts?id=65d6788b-b721-4543-8e78-d5184c1342c1&maxDataAge=3600&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-ppcbj/embed/charts?id=65d6788b-b721-4543-8e78-d5184c1342c1&maxDataAge=3600&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-ppcbj/embed/charts?id=65d6788b-b721-4543-8e78-d5184c1342c1&maxDataAge=3600&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-ppcbj/embed/charts?id=65d6788b-b721-4543-8e78-d5184c1342c1&maxDataAge=3600&theme=light&autoRefresh=true"
]

const DashboardPage = () => {
  return (
    <Layout>
      <ChartsSection chartUrls={chartUrls} />
    </Layout>
  )
}

export default DashboardPage
