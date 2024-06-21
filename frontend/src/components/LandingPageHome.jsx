import React from 'react'
import { Link } from 'react-router-dom'
import frisbeeimage from '../images/frisbeeimage.jpg'
import './LandingPageHome.css'
export default function LandingPageHome() {
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
            <h1 className="allheadings">
              Play Ultimate Frisbee
            </h1>
            <p className="">
               Join a community of ultimate frisbee enthusiasts and take your game to the next level.
            </p>
          </div>
          <a
            className="joinnow"
            href="#"
          >
            <button className='introbtn'>Join Now</button>
          </a>
          
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
  <section className="AboutSection">
    <div className="">
      <div className="">
        <div className="AboutBox"><div>About</div></div>
        <h1 className="allheadings">What is Ultimate Frisbee?</h1>
        <p className="">
          Ultimate frisbee is a fast-paced, non-contact team sport played with a flying disc. Players score points
          by passing the disc to a teammate in the opposing team's end zone. It's a game that combines the best
          aspects of sports like soccer, basketball, and American football.
        </p>
      </div>
    </div>
  </section>

  <section className="JoinTeamSection">
    <div className="">
      <div className="">
      <div className="JoinTeamBox"><div>Join a Team</div></div>
        <h1 className="allheadings">Find Your Local Ultimate Frisbee Team</h1>
        <p className="p1">
          Whether you're a seasoned player or a beginner, there's a team for you. Check out the list of local teams
          and sign up today.
        </p>
        <div className="joinCardsDiv">
          <div className="joincards">
            <h3 className="">Acme Ultimate</h3>
            <p className="">Competitive team in downtown</p>
            <a
            className="joinnow"
            href="#"
          >
            <button className=''>Join Now</button>
          </a>
          </div>
          <div className="joincards">
            <h3 className="">Frisbee Flyers</h3>
            <p className="">Recreational team in the suburbs</p>
            <a
            className="joinnow"
            href="#"
          >
            <button className=''>Join Now</button>
          </a>
          </div>
          <div className="joincards">
            <h3 className="">Ultimate Aces</h3>
            <p className="">Mixed team for all skill levels</p>
            <a
            className="joinnow"
            href="#"
          >
            <button className=''>Join Now</button>
          </a>
          </div>
          <div className="joincards">
            <h3 className="">Disc Dominators</h3>
            <p className="">Women's competitive team</p>
            <a
            className="joinnow"
            href="#"
          >
            <button className=''>Join Now</button>
          </a>
          </div>
        </div>
      </div>
    </div>
  </section>


  <section className="EventsSection">
    <div className="">
      <div className="">

      <div className="AboutBox"><div>Upcoming Events</div></div>

        <h1 className="allheadings">
          Ultimate Frisbee Tournaments and Meetups
        </h1>
        <p className="p1">
          Check out the upcoming ultimate frisbee tournaments and meetups in your area. Join the community and take
          your game to the next level.
        </p>
        <div className="joinCardsDiv">
          <div className="joincards addbackcolor">
            <h3 className="">Ultimate Summer Jam</h3>
            <p className="">June 15-16, Downtown Park</p>
            <a
            className="joinnow"
            href="#"
          >
            <button className=''>Learn More</button>
          </a>
          </div>
          <div className="joincards addbackcolor">
            <h3 className="">Ultimate Frisbee Meetup</h3>
            <p className="">July 1, Community Center</p>
            <a
            className="joinnow"
            href="#"
          >
            <button className=''>Learn More</button>
          </a>
          </div>
          <div className="joincards addbackcolor">
            <h3 className="">Ultimate Frisbee League</h3>
            <p className="">August 1 - October 15, City Park</p>
            <a
            className="joinnow"
            href="#"
          >
            <button className=''>Learn More</button>
          </a>
          </div>
          <div className="joincards addbackcolor">
            <h3 className="">Ultimate Frisbee Clinic</h3>
            <p className="">September 10, Community Center</p>
            <a
            className="joinnow"
            href="#"
          >
            <button className=''>Learn More</button>
          </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer className="footer">
            <div className="footer-content">
                <div className="footer-section social">
                    <h2>play.ultimate</h2>
                    <p>Discover the world of ultimate frisbee and connect with players across the globe.</p>
                    <div className="social-icons">
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-facebook"></i>
                    </div>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/tournaments">Tournaments</Link></li>
                        <li><Link to="/teams">Teams</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>
                <div className="footer-section legal">
                    <h3>Legal</h3>
                    <ul>
                        <li><Link to="/terms-of-service">Terms of Service</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 play.ultimate. All rights reserved.</p>
            </div>
        </footer>
</>

  )
}
