import Container from '../../common/container'
import Title from '../../common/title'
import styles from './index.module.css'
import Image from 'next/image'
import Resources1 from '../../../assets/images/case-studies/resources1.png'
import Resources2 from '../../../assets/images/case-studies/resources2.png'
import Resources3 from '../../../assets/images/case-studies/resources3.png'
import ForwardArrow from '../centi-case-study/svgs/forwardarrow'


const circleShapex2 = require('../../../assets/images/home-page/api-section/circle-shape.svg')

const ApiSection = () => {
  return (
    <section className={styles.base} style={{width: '100vw'}}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <p className={styles.p}>
              OTHER CASE STUDIES 
            </p>
            <Title heading="h2" classNames={styles.fontBold}>
              Still curious?
            </Title>
            <p className={styles.p24}>
              Explore these additional resources to help you <br />launch successful blockchain projects.
            </p>            
          </div>         
        </div>
        <div className={styles.curiosCardCont} >
          <div className={styles.curiousCard} style={{width: '22rem'}}>
              <Image className="card-img-top" src={Resources1} alt="Resources Image" />
              <div className="card-body" style={{padding:'20px'}}>
                <h5 className={styles.curiousCardTitle}>Docs</h5>
                <p className={styles.curiousCardText}>Our extensive documentation will teach you the purpose of each endpoint and show you exactly how you can implement each one into your application....</p>
                <div className={styles.link}>
                  <a href="/docs" className={styles.linkInner}>
                    <span className="mr-5 mb-1">Explore Resources</span>
                    <ForwardArrow/>
                  </a>
                </div>
              </div>
          </div>
          <div className={styles.curiousCard} style={{width: '22rem'}}>
              <Image className="card-img-top" src={Resources2} alt="Resources Image" />
              <div className="card-body" style={{padding:'20px'}}>
                <h5 className={styles.curiousCardTitle}>Blog</h5>
                <p className={styles.curiousCardText}>We often write about different technical topics around blockchain technology and Bitcoin SV. Click the link below to read some our blogs and how to guides...</p>
                <div className={styles.link}>
                  <a href="/blog" className={styles.linkInner}>
                    <span className="mr-5 mb-1">Explore Resources</span>
                    <ForwardArrow/>
                  </a>
                </div>

              </div>
          </div>
          <div className={styles.curiousCard} style={{width: '22rem'}}>
              <Image className="card-img-top" src={Resources3} alt="Resources Image" />
              <div className="card-body" style={{padding:'20px'}}>
                <h5 className={styles.curiousCardTitle}>Help Center</h5>
                <p className={styles.curiousCardText}>If you can't find any answers to your questions please make your way to the help center where we have an FAQ section and contact information for the team....</p>
                <div className={styles.link}>
                  <a href="/faqs" className={styles.linkInner}>
                    <span className="mr-5 mb-1">Explore Resources</span>
                    <ForwardArrow/>
                  </a>
                </div>
              </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ApiSection
