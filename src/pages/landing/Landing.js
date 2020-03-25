import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Container, Row, Card, CardText, CardBody,CardTitle,CardSubtitle,Button } from "reactstrap";
import AOS from 'aos'
import 'aos/dist/aos.css';
import dashboardImg from '../../assets/img/screenshots/dashboard-default.png'

const Intro = () => (
  <section className="pt-8 pb-11 pt-md-9 pb-md-12 py-lg-14 bg-light bg-between" >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 order-md-2" data-aos="fade-up">
        <div className="img-skewed img-skewed-left mb-8 mb-md-0">
          <img src={dashboardImg} alt="..." className="screenshot img-fluid mw-md-130" data-aos="img-skewed-item-left" data-aos-delay="100"/>
        </div>
        </div>
        <div className="col-12 col-md-6 order-md-1" data-aos="fade-up">


            <h1 className="display-3">
              Finally.
              <span className="text-primary">Something Different</span>.
            </h1>


            <p className="lead text-muted mb-6 mb-md-8">
              Intelligent developers use our Dashkit theme to build their internal tools and client admin applications. Save yourself time and money.
            </p>


              <Link to="/auth/sign-up" className='mr-1 lift'><Button>Create Your First Hub</Button></Link>


          </div>



      </div>
    </div>
  </section>
);

const Footer = () => (
  <section classNameName="py-5">
    <Container classNameName="text-center">
      <Row>
        <Col md="9" lg="8" xl="6" classNameName="mx-auto">
          <h2 classNameName="h1 mb-3">
            Join over 2,500 developers who are already working with our products
          </h2>
          <Button
            color="primary"
            size="lg"
            href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Purchase
          </Button>
        </Col>
      </Row>
    </Container>
  </section>
);

class Landing extends React.Component {

  render() {
    AOS.init()
    return (
      <React.Fragment>
        {/* <Navigation />*/}
        <Intro />

        {/*<Footer />*/}
      </React.Fragment>
    );
  }
}

export default connect()(Landing);
