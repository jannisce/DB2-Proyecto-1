import React from 'react'
import Layout from '../components/Layout/Layout'
import ChartsSection from '../components/ChartsSection/ChartsSection'

const chartUrls = [
    "https://charts.mongodb.com/charts-project-0-ppcbj/embed/charts?id=65d6788b-b721-4543-8e78-d5184c1342c1&maxDataAge=3600&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-ppcbj/embed/charts?id=65dbc834-6d36-4a26-81cc-048c3def600e&maxDataAge=3600&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-ppcbj/embed/charts?id=65dbc973-7acb-498b-82b0-94294a67cc28&maxDataAge=3600&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-ppcbj/embed/charts?id=65dbcae8-d109-47ef-88db-19f06af15750&maxDataAge=3600&theme=light&autoRefresh=true"
  ]

const DashboardPage = () => {
  return (
    <Layout>
      <ChartsSection chartUrls={chartUrls} />
    </Layout>
  )
}

export default DashboardPage
