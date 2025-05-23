import WavingHandIcon from '@mui/icons-material/WavingHand';
import "./home.scss";

export const Home = () => {
  return (
    <div className='home'>
      <div className="intro">
      <p className="hi">Hi, there<WavingHandIcon/></p>
      <p>This is a practical study comparing (mostly) JavaScript charting libraries.</p>
      <p>Want to know more? You can find my Bachelorthesis on the topic here.</p>
      <p>The code is available on the GitHub <a href='https://github.com/Deaniebean/data-viz-libraries'>Repo.</a> </p>
      </div>
      <div className="img-table">
        <h2>Use Cases</h2>
        <div>
          <img src="/data-viz-libraries/linechart.jpg"/>
          <img src="/data-viz-libraries/pareto.jpg"/>
        </div>
        <div>
        <img src="/data-viz-libraries/sankey_1.jpg"/>
        <img src="/data-viz-libraries/sankey_2.jpg"/>
        </div>
      </div>
    </div>
  )
}


