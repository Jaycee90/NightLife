import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faComment } from "@fortawesome/free-solid-svg-icons";
import '../css/footer.css';

export default function Footer() {
    return (
        <div className="footer-component">
            
		<div className="Box">
			<h1 style={{textAlign: "center",paddingBottom: "20px"}}>Uncover places, discover world!</h1>
			<div className="FooterContainer">
				<div className="Row">
					<div className="Column">
						<p className="Heading">Leave Us a Message</p>
						<a href="/feedback" className="FooterLink">and we will get back to you as soon as possible.</a>
                        <a href="/feedback" className="FooterLink"><button className="btn btn-primary" style={{fontSize:'12px', backgroundColor: "#e24e99 ", borderRadius:'15px',}}>Leave us a message</button></a>
					</div>
					<div className="Column">
						<p className="Heading">Supervisors</p>
						<a href="/" className="FooterLink">Instructor: Dr. Ted Lehr</a>
						<a href="/" className="FooterLink">D.I.Assistant: Mirna Elizondo</a>
						<a href="/" className="FooterLink">Grader: Sarah Davidson</a>
					</div>
					<div className="Column">
						<p className="Heading">About Us</p>
						<a href="/" className="FooterLink">Meet the Team</a>
						<a href="/" className="FooterLink">Our vision</a>
						<a href="/" className="FooterLink">Help & FAQ</a>

					</div>
					<div className="Column">
						<p className="Heading">Contact</p>
						<a href="/" className="FooterLink">
                        <FontAwesomeIcon icon={faPhone} size="1x" style={{paddingRight:'5px'}}/>Phone: (512) 245-2111</a>
						<a href="/" className="FooterLink">
                        <FontAwesomeIcon icon={faEnvelope} size="1x" style={{paddingRight:'5px'}}/>Email: vibetracktxt@gmail.com</a>
						<a href="/" className="FooterLink">
                        <FontAwesomeIcon  icon={faComment} size="1x" style={{paddingRight:'5px'}}/>Chat with our AI bot</a>
					</div>
				</div>
			</div>
            <p className="Disclaimer">Copyright © 2023 Vibetrack · Terms · Privacy Policy · Contact Us</p>
		</div>
        </div>
	);
}
