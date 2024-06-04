import React from 'react'
import frisbeeimage from '../images/frisbeeimage.jpg'
import './LandingPage.css'
import { Link } from 'react-router-dom'
export default function LandingPage() {

  return (
    <>
    <section className="IntroSection">
      <header className="IntroHeder">
        <h2 className="">Ultimate Frisbee</h2>
      </header>
      <div className="">
        <div className="row1">
          <div className="introdiv">
            <div className="">
              <h1 className="LandingPageH1">
              Experience the Ultimate Frisbee Lifestyle
              </h1>
              <p className="">
              Join a community of passionate players, find local events, and learn the sport of ultimate frisbee with play.ultimate.
              </p>
            </div>

            <Link to='/login'><button className='introbtn'>Get Started</button></Link>
              
            
          </div>
          <div className='introimgdiv'>
          <img
            alt="Ultimate Frisbee"
            id='frisbeeimg'
            src={frisbeeimage}
          />
          </div>   
        </div>
      </div>
    </section>
    
    <section className="IntroSection2">
      <div className="">
        <div className="IntroSection2Div">
          <div className="IntroSection2Divchild">
          <i className="fa-regular fa-user"></i>
            <h2 className="">Join a Team</h2>
            <p className="">
              Connect with local ultimate frisbee teams and find your new community.
            </p>
          </div>
          <div className="IntroSection2Divchild">
          <i className="fa-regular fa-calendar"></i>
            <h2 className="">Find Events</h2>
            <p className="">
              Discover ultimate frisbee tournaments, leagues, and pickup games near you.
            </p>
          </div>
          <div className="IntroSection2Divchild">
          <i className="fa-brands fa-leanpub"></i>
            <h2 className="">Learn the Sport</h2>
            <p className="">
              Improve your skills and deepen your understanding of ultimate frisbee.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="IntroSection3">
      <div className="IntroSection3Div">
        <div className="">
          <h2 className="">
            Join the Ultimate Frisbee Community
          </h2>
          <br />
          <p className="">
            Whether you're a seasoned player or new to the sport, play.ultimate has everything you need to get started
            and stay connected.
          </p>
          
        </div>
        <div className="">
             <br />
             <Link to='/login'> <button className='GetStarted'>Get Started</button></Link>
          
        </div>
      </div>
    </section>

  </>
  )
}
