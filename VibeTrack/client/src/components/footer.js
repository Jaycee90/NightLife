import React from "react";
import '../css/footer.css';

export default function Footer() {
    return (
        <div className="footer-component">
            
		<div className="Box">
			<h1 style={{textAlign: "center",paddingBottom: "20px",}}>Uncover places, discover world!</h1>
			<div className="FooterContainer">
				<div className="Row">
					<div className="Column">
						<p className="Heading">Leave Us a Message</p>
						<a href="#" className="FooterLink">and we will get back to you as soon as possible.</a>
					</div>
					<div className="Column">
						<p className="Heading">Supervisor</p>
						<a href="#" className="FooterLink">Instructor: Dr. Ted Lehr</a>
						<a href="#" className="FooterLink">D.I.Assistant: Mirna Elizondo</a>
						<a href="#" className="FooterLink">Grader: Sarah Davidson</a>
					</div>
					<div className="Column">
						<p className="Heading">About Us</p>
						<a href="#" className="FooterLink">Meet the Team</a>
						<a href="#" className="FooterLink">Our vision</a>
						<a href="#" className="FooterLink">Term & Privacy Policy</a>

					</div>
					<div className="Column">
						<p className="Heading">Contact</p>
						<a href="#" className="FooterLink">(512) 245-2111</a>
						<a href="#" className="FooterLink">601 University Dr</a>
						<a href="#" className="FooterLink">San Marcos, TX 78666</a>
					</div>
				</div>
			</div>
		</div>
        </div>
	);
}
