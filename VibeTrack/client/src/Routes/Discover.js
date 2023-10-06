import React from "react";
import styles from '../css/Discover.css';

function Discover() {
    return (
        <div className={styles.discoverContainer}>
        <section class="clublist" id="destination">
        <div class="container" >
          <p class="section-subtitle">Discover all nightclubs and venues in the San Marcos area </p>
          <h2 class="h2 section-title">Discover venues</h2>
            <li>
              <div class="clublist-card" style={{'height':'130px', 'margin-bottom':'20px'}}>
                <figure class="card-img">
                  <img src="https://i.imgur.com/ikuh0yR.jpg" alt="Zelicks" loading="lazy"/>
                </figure>
                <div class="card-content">
                  <div class="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                  <div class="grid-clublist">
                    <div class="item"><h3 class="h3 card-title"><a href="http://www.zelickssmtx.com/">Zelicks Icehouse</a></h3>
                  <p class="card-subtitle">336 W Hopkins St</p></div>
                  <div class="item"><p class="card-text">Welcome to the best little icehouse in Texas. Come out and see what the "Mystery Keg" is every Friday. Experience this new, unique establishment to the San Marcos bar scene. </p></div>
                  
                  </div>
                </div>

              </div>
            </li>

            <li>
              <div class="clublist-card"  style={{'height':'130px', 'margin-bottom':'20px'}}>
                <figure class="card-img">
                  <img src="https://i.imgur.com/u5W6rwg.jpg" alt="Patio Dolcetto" loading="lazy"/>
                </figure>
                <div class="card-content">
                  <div class="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                  <div class="grid-clublist" >
                    <div class="item"><h3 class="h3 card-title"><a href="https://patiodolcetto.com/">Patio Dolcetto</a></h3>
                  <p class="card-subtitle">322 Cheatham Street</p></div>
                  <div class="item"><p class="card-text">Enjoy dining and imbibing at Patio Dolcetto. Treat yourself to great wines, craft ciders, cocktails, martinis, craft beers and good food on the romantic patio.  </p></div>
                  </div>
                </div>

              </div>
            </li>

            <li>
              <div class="clublist-card"   style={{'height':'130px', 'margin-bottom':'20px'}}>
                <figure class="card-img">
                  <img src="https://i.imgur.com/gdesrlS.jpg" alt="The Taproom" loading="lazy"/>
                </figure>

                <div class="card-content">
                  <div class="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                  <div class="grid-clublist">
                    <div class="item"><h3 class="h3 card-title"><a href="https://www.taproomsanmarcos.com/">The Taproom</a></h3>
                  <p class="card-subtitle">129 E. Hopkins St. Suite 120</p></div>
                  <div class="item"><p class="card-text">Taproom Pub and Grub opened its door in 1994 with one goal in mind, to serve the best food and beer around, and over 20 years later that is exactly what their customers have come to expect.   </p></div>
                  </div>
                </div>

              </div>
            </li>

          <button class="btn btn-primary">Discover More</button>

        </div>
      </section>
        </div>
    );
};

export default Discover;