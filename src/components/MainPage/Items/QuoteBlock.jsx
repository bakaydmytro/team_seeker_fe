import Quote1 from '../../../img/Quote1.png'
import Quote2 from '../../../img/Quote2.png'
import Quote3 from '../../../img/Quote3.png'
import './QuoteBlock.css'

export default function QuoteBlock() {
  return (
    <section className='quote-image-section'>
      <div class="image-container">
        <div> <img src={Quote1} className='image img1' /> </div>
        <div> <img src={Quote2} className='image img2' /> </div>
        <div> <img src={Quote3} className='image img3' /> </div>
      </div>
      <div className="scroll-circles-block">
        <span className="scroll-circles circle-active"></span>
        <span className="scroll-circles"></span>
        <span className="scroll-circles"></span>
      </div>
    </section>
  )
}
