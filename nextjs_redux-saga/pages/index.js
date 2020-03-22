import React from "react";
import PropTypes from "prop-types";

const Index = props => {
  const { greeting } = props
  console.log(greeting)

  return (
      <>
        { greeting }
      </>
  )
}

Index.propTypes = {
  greeting: PropTypes.string
}

Index.getInitialProps = () => { greeting: 'Hello World!' }

export default Index
