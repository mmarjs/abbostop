import React from 'react'
import Link from 'next/link';

const PageNotFound = () => {

  return (
    <div className="PageNotFound">
      <div className="center_section">
        <div>
          <h1>404 Page</h1>
        </div>
        <div>
          <h3 className="description">This page could not be found</h3>
        </div>
        <Link href="/">
          <span className="btn btn-info btn_info_big_header">Go to home page</span>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound;