import "./Home.css"
import {motion} from "framer-motion"
import {Link} from "react-router-dom"

const transition = {
    delay: 0.5,
    ease:"linear",
    duration: 0.4
}  

const Home = () => {
    return ( 
        <div className="home-container">
            <motion.h1 transition={transition} initial={{ rotateX:180 }} animate={{
                    x: 0,
                    y: 0,
                    rotateX: 0,
                }} className="hero-text">Doubleflip</motion.h1>
            <h3 className="hero-subtext">Reveal another side to your images.</h3>
            <Link to="/display"><button className="enter-button">Start Flipping</button></Link>
        </div>
    );
}
 
export default Home;