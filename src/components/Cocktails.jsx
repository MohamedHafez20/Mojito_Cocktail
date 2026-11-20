import { cocktailLists,mockTailLists } from "../constants/index.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Cocktails = () => {
    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#cocktails",
                start: "top 30%",
                end: "bottom 80%",
                scrub: true,
            }
        });
        parallaxTimeline
	 .from('#c-left-leaf', {
		x: -100, y: 100
	})
	 .from('#c-right-leaf', {
		x: 100, y: 100
	})
    })
  return (
    <section id="cocktails" className="noisy">
        <img src="images/cocktail-left-leaf.png" alt="left leaf" id="c-left-leaf" />
        <img src="images/cocktail-right-leaf.png" alt="right leaf" id="c-right-leaf" />
        
        <div className="list">
            <div className="popular">
                <h2>Most Popular cocktails</h2>

                <ul>
                {cocktailLists.map((cocktail) => (
                    <li key={cocktail.name}>
                      <div className="md:me-28" >
                        <h3>{cocktail.name}</h3>
                        <p>{cocktail.description} | {cocktail.detail}</p>
                        </div>
                        <span className="price">{cocktail.price}</span>  
                    </li>
                ))}    
                </ul>
            </div>
            <div className="loved">
                <h2>Most Loved cocktails</h2>

                <ul>
                {mockTailLists.map((mockTail) => (
                    <li key={mockTail.name}>
                      <div className="me-28" >
                        <h3>{mockTail.name}</h3>
                        <p>{mockTail.description} | {mockTail.detail}</p>
                        </div>
                        <span className="price">{mockTail.price}</span>  
                    </li>
                ))}    
                </ul>
            </div>

        </div>
    </section>
  )
}

export default Cocktails