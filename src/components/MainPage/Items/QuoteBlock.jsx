import Quote1 from '../../../img/Quote1.png' 
import Quote2 from '../../../img/Quote2.png'
import Quote3 from '../../../img/Quote3.png'
import './QuoteBlock.css'

export default function QuoteBlock(){
    return(    
        <div class="owl-carousel">
        <div> <img src={Quote1} className='img1'/> </div>
        {/* <div> <img src={Quote2} className='img2'/> </div>
        <div> <img src={Quote3} className='img3'/> </div> */}
      </div>
    )
}
