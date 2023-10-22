import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import '../css/Home.css';

export default function Home() {
 const navigate = useNavigate();
 return (
    <div>
      <div class="section-intro">
        <img src="https://i.imgur.com/SoHE2tO.png" alt="Logo" loading="lazy" style={{'padding-bottom':'25px'}}/>
          <p class="section-subtitle">Uncover places, Discover world</p>
          <h2 class="h2 section-title">VibeTrack</h2>
                    
          <div class="row-flex">
            <div class="link-wrapper">
            <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
            </div>
            <div class="link-wrapper">
            <Button variant="contained" onClick={() => navigate("/signup")}>Signup</Button>
              </div>
            </div>
          </div>
                
          <div class="about-us">
            <h3> Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              A quos, voluptatum illum mollitia dolores libero placeat 
              nesciunt quasi adipisci impedit!Lorem ipsum dolor sit, 
              amet consectetur adipisicing elit. 
              A quos, voluptatum illum mollitia dolores libero placeat 
              nesciunt quasi adipisci impedit!
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              A quos, voluptatum illum mollitia dolores libero placeat 
              nesciunt quasi adipisci impedit!Lorem ipsum dolor sit.
            </p>
          </div>
  

      <section class="popular" id="destination">
        <div class="container">
          <h2 class="h2 section-title">Popular venues</h2>
          <p class="section-text">
            Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum. Vestibulum cumque laudantium.
            Sit ornare mollitia tenetur, aptent.
          </p>

          <ul class="popular-list">
            <li>
              <div class="popular-card">
                <figure class="card-img"><img src="https://s3-media0.fl.yelpcdn.com/bphoto/oK4cg3caAha6jnC58dI2nA/o.jpg" alt="Zelicks" loading="lazy"/></figure>

                <div class="card-content">
                  <div class="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>

                  <p class="card-subtitle">336 W Hopkins St</p>
                  <h3 class="h3 card-title"><a href="http://www.zelickssmtx.com/">Zelicks</a></h3>

                  <p class="card-text">Fusce hic augue velit wisi ips quibusdam pariatur, iusto.</p>
                </div>
              </div>
            </li>

            <li>
              <div class="popular-card">
                <figure class="card-img"><img src="https://i.imgur.com/u5W6rwg.jpg" alt="Patio Dolcetto" loading="lazy"/></figure>

                <div class="card-content">
                  <div class="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                  <p class="card-subtitle">322 Cheatham Street
                  </p>
                  <h3 class="h3 card-title"><a href="https://patiodolcetto.com/">Patio Dolcetto</a></h3>

                  <p class="card-text">Fusce hic augue velit wisi ips quibusdam pariatur, iusto.</p>
                </div>
              </div>
            </li>

            <li>
              <div class="popular-card">
                <figure class="card-img"><img src="https://i.imgur.com/gdesrlS.jpg" alt="The Taproom" loading="lazy"/></figure>
                <div class="card-content">
                  <div class="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                  <p class="card-subtitle">129 E. Hopkins St. Suite 120</p>

                  <h3 class="h3 card-title"><a href="https://www.taproomsanmarcos.com/">The Taproom</a></h3>

                  <p class="card-text">Fusce hic augue velit wisi ips quibusdam pariatur, iusto.</p>
                </div>
              </div>
            </li>
          </ul>
          <button class="btn btn-primary">Discover venues near you</button>
        </div>
      </section>
      <div class="container">
        <div class="grid-contact">
          <div class="item">
            <h3>Leave Us a Message</h3>
                <p><span>and we will get back to you as soon as possible.</span></p>
                <form class="media-centered">
                  <div class="form-group">
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Type in your email..."/></div>
                  <div class="form-group">
                    <input type="text" class="form-control" id="exampleText1" placeholder="Type in your message..."/>
                  </div>
                  <button style={{"margin-left":"175px"}} type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>

            <div class="item">
              <h3>Supervisor</h3>
              <p>
              <span>Instructor: Dr. Ted Lehr</span> 
              <span>D.I. Assistant : Mirna Elizondo</span>
              <span>Grader: Sara Davidson</span>
              </p>
            </div>
            
            <div class="item">
              <h3>Contact</h3>
              <p>
                <span>(512) 245-2111</span>
                <span>601 University Dr</span>
                <span>San Marcos, TX 78666</span>
              </p>
            </div>
          </div>
      </div>
    </div>
  );
}