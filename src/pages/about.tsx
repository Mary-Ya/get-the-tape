import React, { useEffect } from "react";
import api from "../common/api";

const About = () => {

    // TEST
    /*useEffect(() => {
        api.reject().then((res) => {
            console.info(res);
        }).catch(err => {
            console.info(err);
        })
    }, [])*/

    return <div>
        About the game
    </div>
};

export default About;