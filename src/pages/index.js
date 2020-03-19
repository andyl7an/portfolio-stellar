import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Header from '../components/Header'
import 'font-awesome/css/font-awesome.css'

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet title="Andy Tan" />

        <Header />
      </Layout>
    )
  }
}

export default Index
