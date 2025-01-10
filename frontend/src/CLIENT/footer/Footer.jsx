import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  return (
    <footer className='footer' style={{ marginTop: 'auto' }}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <h5 className='h5 mt-3'>Info</h5>
            <ul className='list-unstyled'>
              <li>Email: librarysystem@uetpeshawar.edu.pk</li>
              <li>Phone: +923458826673</li>
              <li>Address: UET Peshawar</li>
            </ul>
          </div>
          <div className='col-md-4'>
            <h5 className='h5 mt-3'>Links</h5>
            <ul className='list-unstyled'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/books'>Books</Link>
              </li>
              <li>
                <Link to='/about'>About Us</Link>
              </li>
            </ul>
          </div>
          <div className='col-md-4'>
            <h5 className='h5 mt-3'>Legal</h5>
            <ul className='list-unstyled'>
              <li>
                <Link to='/about'>Privacy Policy</Link>
              </li>
              <li>
                <Link to='/about'>Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
