import React from 'react'
import { ArrowUp } from 'react-feather';
import { Link } from 'react-router-dom';

const BackToTop = () => {
    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    window.onscroll = function () { backToTopButton() };

    function backToTopButton() {
        var ele = document.getElementById("back-to-top")
        if (ele) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                ele.style.display = "flex";
            } else {
                ele.style.display = "none";
            }
        }
    }
    return (
        <React.Fragment>
            <Link to="#"
                onClick={() => toTop()}
                id="back-to-top"
                className="btn btn-icon btn-dark back-to-top"
                style={{ display: "none" }}
            >
                {/* <FeatherIcon icon="arrow-up" className="icons" /> */}
                <ArrowUp className="icons" />
            </Link>
        </React.Fragment>
    );
}

export default BackToTop